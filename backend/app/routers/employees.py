from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/api/admin/employees", tags=["Employees"])

@router.get("", response_model=List[schemas.UserResponse])
def get_employees(db: Session = Depends(get_db)):
    return crud.get_all_users(db)

@router.post("", response_model=schemas.UserResponse)
def create_employee(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)