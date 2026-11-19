import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env", override=False)


class Settings:
    PROJECT_NAME = "Employee Leave & Attendance System"
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./employee_system_v2.db")
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "dev-only-change-this-secret-key-before-deployment",
    )
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


settings = Settings()

if os.getenv("ENVIRONMENT", "development").lower() == "production" and settings.SECRET_KEY.startswith("dev-only-"):
    raise RuntimeError("Set a strong SECRET_KEY before running in production.")
