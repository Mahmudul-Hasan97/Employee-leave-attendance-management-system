from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.config import settings


password_context = CryptContext(
    schemes=["pbkdf2_sha256", "bcrypt"],
    deprecated="auto",
)


def verify_password(plain_password: str, stored_password: str | None) -> bool:
    if not stored_password:
        return False
    return password_context.verify(plain_password, stored_password)


def get_password_hash(password: str) -> str:
    return password_context.hash(password)


def create_access_token(subject: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return jwt.encode(
        {"sub": subject, "exp": expires_at},
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
