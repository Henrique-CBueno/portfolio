import logging
import os
import smtplib
import socket  # <--- IMPORTANTE: Adicionado para manipular a rede
from email.message import EmailMessage
import traceback

from celery import Celery
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Configurações do Celery via variáveis de ambiente
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "email_service",
    broker=REDIS_URL,
    backend=REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    task_track_started=True,
    task_acks_late=True,
    worker_disable_rate_limits=True,
)


@celery_app.on_after_configure.connect
def setup_worker(sender, **kwargs):
    logger.info("Worker inicializando...")
    load_dotenv(override=True)
    
    required_vars = ["MAIL_SERVER", "MAIL_PORT", "MAIL_USERNAME", "MAIL_PASSWORD", "SMTP_TO"]
    missing = [var for var in required_vars if not os.getenv(var)]
    
    if missing:
        logger.error(f"Variáveis de ambiente faltando: {', '.join(missing)}")
    else:
        logger.info(f"Worker pronto. MAIL_SERVER={os.getenv('MAIL_SERVER')}, SMTP_TO={os.getenv('SMTP_TO')}")


def _boolean_env(name: str, default: bool = True) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes"}


def _build_message(name: str, email: str, message: str) -> EmailMessage:
    recipient = os.getenv("SMTP_TO")
    if not recipient:
        raise ValueError("SMTP_TO não configurado.")

    sender = os.getenv("MAIL_FROM", os.getenv("MAIL_USERNAME", "no-reply@example.com"))
    subject = os.getenv("MAIL_SUBJECT", "Novo contato recebido")

    mail = EmailMessage()
    mail["Subject"] = subject
    mail["From"] = sender
    mail["To"] = recipient
    mail["Reply-To"] = email
    body = (
        f"Nome: {name}\n"
        f"Email: {email}\n\n"
        f"Mensagem:\n{message}\n"
    )
    mail.set_content(body)
    return mail


def _send_email(name: str, email: str, message: str) -> None:
    host = os.getenv("MAIL_SERVER")
    port = int(os.getenv("MAIL_PORT", "587"))
    username = os.getenv("MAIL_USERNAME")
    password = os.getenv("MAIL_PASSWORD")
    use_tls = _boolean_env("MAIL_USE_TLS", True)

    if not host:
        raise ValueError("MAIL_SERVER não configurado.")
    if not username or not password:
        raise ValueError("MAIL_USERNAME e MAIL_PASSWORD são obrigatórios.")

    logger.debug(f"Resolvendo DNS para {host} forçando IPv4...")

    # --- CORREÇÃO DE IPV6/TIMEOUT AQUI ---
    try:
        # socket.AF_INET obriga a buscar apenas endereços IPv4
        addr_info = socket.getaddrinfo(host, port, socket.AF_INET, socket.SOCK_STREAM)
        # Pega o IP do primeiro resultado
        ipv4_target = addr_info[0][4][0]
        logger.debug(f"DNS Resolvido: Conectando em {ipv4_target}:{port} (IPv4)")
    except Exception as e:
        logger.error(f"Falha ao resolver DNS IPv4: {e}")
        # Se falhar a conversão manual, tenta usar o host original como fallback
        ipv4_target = host
    # -------------------------------------

    mail = _build_message(name, email, message)

    # Conecta usando o IP numérico, ignorando o problema de rota IPv6 do Docker
    with smtplib.SMTP(ipv4_target, port, timeout=30) as smtp:
        if use_tls:
            smtp.starttls()
        
        smtp.login(username, password)
        smtp.send_message(mail)
        logger.debug("Email enviado via SMTP (Sucesso)")


@celery_app.task(name="service.emailService.send_contact_email", bind=True, autoretry_for=(Exception,), retry_kwargs={"max_retries": 3, "countdown": 60})
def send_contact_email(self, name: str, email: str, message: str) -> None:
    logger.info(f"=== INICIANDO TAREFA ===")
    logger.info(f"Nome: {name}, Email: {email}")
    
    try:
        logger.info("Carregando variáveis de ambiente...")
        load_dotenv(override=True)
        
        host = os.getenv("MAIL_SERVER")
        port = os.getenv("MAIL_PORT")
        username = os.getenv("MAIL_USERNAME")
        password = os.getenv("MAIL_PASSWORD")
        recipient = os.getenv("SMTP_TO")
        
        logger.info(f"MAIL_SERVER: {host}")
        logger.info(f"SMTP_TO: {recipient}")
        
        logger.info("Enviando email...")
        _send_email(name, email, message)
        logger.info(f"✓ Email enviado com sucesso para {email}")
        
    except Exception as exc:
        logger.error(f"✗ ERRO: {exc}")
        logger.error(traceback.format_exc())
        raise


def enqueue_contact_email(name: str, email: str, message: str):
    logger.info(f"[FILA] Enfileirando tarefa para {email}")
    task = send_contact_email.delay(name, email, message)
    logger.info(f"[FILA] Task ID: {task.id}")
    return task