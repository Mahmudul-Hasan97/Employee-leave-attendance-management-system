from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app import models  # Ensures models are registered
from app.routers import leave

# Create database tables automatically if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leave.router)

@app.get("/")
def home():
    return {"message": "Backend Running"}