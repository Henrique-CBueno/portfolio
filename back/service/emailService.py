import logging
import os
import traceback
from email.mime.text import MIMEText

from celery import Celery
from dotenv import load_dotenv
import resend

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
    
    required_vars = ["RESEND_API_KEY", "MAIL_FROM", "SMTP_TO"]
    missing = [var for var in required_vars if not os.getenv(var)]
    
    if missing:
        logger.error(f"Variáveis de ambiente faltando: {', '.join(missing)}")
    else:
        logger.info(f"Worker pronto. MAIL_FROM={os.getenv('MAIL_FROM')}, SMTP_TO={os.getenv('SMTP_TO')}")


def _build_message(name: str, email: str, message: str) -> dict:
    recipient = os.getenv("SMTP_TO")
    if not recipient:
        raise ValueError("SMTP_TO não configurado.")

    sender = os.getenv("MAIL_FROM", "noreply@example.com")
    subject = os.getenv("MAIL_SUBJECT", "Novo contato recebido")

    html_body = f"""
    <h2>Novo contato recebido</h2>
    <p><strong>Nome:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Mensagem:</strong></p>
    <p>{message.replace(chr(10), '<br>')}</p>
    """

    text_body = f"Nome: {name}\nEmail: {email}\n\nMensagem:\n{message}"

    return {
        "from": sender,
        "to": recipient,
        "subject": subject,
        "html": html_body,
        "text": text_body,
    }


def _send_email(name: str, email: str, message: str) -> None:
    api_key = os.getenv("RESEND_API_KEY")
    
    if not api_key:
        raise ValueError("RESEND_API_KEY não configurado.")

    logger.debug("Inicializando Resend API key...")
    resend.api_key = api_key

    mail_data = _build_message(name, email, message)

    logger.debug(f"Enviando email via Resend para {mail_data['to']}...")
    
    response = resend.Emails.send({
        "from": mail_data["from"],
        "to": mail_data["to"],
        "subject": mail_data["subject"],
        "html": mail_data["html"],
    })

    # SDK retorna dict-like com chave 'id' em caso de sucesso
    if isinstance(response, dict) and response.get("id"):
        logger.debug(f"Email enviado com sucesso. ID: {response['id']}")
    else:
        raise Exception(f"Falha ao enviar email via Resend: {response}")


@celery_app.task(
    name="service.emailService.send_contact_email",
    bind=True,
    autoretry_for=(Exception,),
    retry_kwargs={"max_retries": 3, "countdown": 60},
)
def send_contact_email(self, name: str, email: str, message: str) -> None:
    logger.info("=== INICIANDO TAREFA ===")
    logger.info(f"Nome: {name}, Email: {email}")
    
    try:
        logger.info("Carregando variáveis de ambiente...")
        load_dotenv(override=True)
        
        mail_from = os.getenv("MAIL_FROM")
        recipient = os.getenv("SMTP_TO")
        
        logger.info(f"MAIL_FROM: {mail_from}")
        logger.info(f"SMTP_TO: {recipient}")
        
        logger.info("Enviando email via Resend...")
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