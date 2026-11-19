import importlib
from pathlib import Path

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings


def _database_url() -> str | URL:
    database_url = settings.DATABASE_URL
    prefix = "sqlite:///"
    if database_url.startswith(prefix):
        database_path = database_url[len(prefix):]
        if database_path != ":memory:" and not database_path.startswith("/") and not database_path.startswith("\\"):
            database_path = str((Path(__file__).resolve().parents[1] / database_path).resolve())
        return URL.create("sqlite", database=database_path)
    return database_url


engine = create_engine(
    _database_url(),
    connect_args={"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def initialize_database() -> None:
    importlib.import_module("app.models")
    Base.metadata.create_all(bind=engine)

    if "password" not in {column["name"] for column in inspect(engine).get_columns("users")}:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE users ADD COLUMN password VARCHAR"))
