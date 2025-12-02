import json
from contextlib import asynccontextmanager
import os
from pathlib import Path
from threading import Lock
import time

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import uvicorn

load_dotenv()
from projects.projects import projects
from service.emailService import enqueue_contact_email


class ContactRequest(BaseModel):
    name: str = Field(..., max_length=120)
    email: EmailStr
    message: str = Field(..., max_length=4000)


RATE_LIMIT_FILE = Path(__file__).resolve().parent / "runtime" / "contact_rate.json"
RATE_LIMIT_FILE.parent.mkdir(parents=True, exist_ok=True)
_rate_lock = Lock()


def _enforce_rate_limit() -> None:
    limit = int(os.getenv("EMAIL_RATE_LIMIT", "10"))
    window_seconds = int(os.getenv("EMAIL_RATE_WINDOW_SECONDS", "120"))
    now = time.time()

    with _rate_lock:
        try:
            with RATE_LIMIT_FILE.open("r", encoding="utf-8") as handle:
                timestamps: list[float] = json.load(handle)
        except FileNotFoundError:
            timestamps = []
        except json.JSONDecodeError:
            timestamps = []

        timestamps = [ts for ts in timestamps if now - ts < window_seconds]
        if len(timestamps) >= limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Limite de envios atingido. Tente novamente em alguns minutos.",
            )

        timestamps.append(now)
        with RATE_LIMIT_FILE.open("w", encoding="utf-8") as handle:
            json.dump(timestamps, handle)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan)

origins_env = os.getenv("BACKEND_CORS_ORIGINS", "*")
origins = ["*"] if origins_env == "*" else [origin.strip() for origin in origins_env.split(",") if origin.strip()]
allow_credentials = origins != ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origins
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"Projects": projects}


@app.post("/contact", status_code=status.HTTP_202_ACCEPTED)
async def contact(payload: ContactRequest):
    _enforce_rate_limit()
    enqueue_contact_email(payload.name, payload.email, payload.message)
    return {"detail": "Mensagem enviada para processamento."}






if __name__ == "__main__":
    port = int(os.getenv("PORT", "3000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
    