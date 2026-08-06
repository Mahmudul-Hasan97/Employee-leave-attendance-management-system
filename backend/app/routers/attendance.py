from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.get("/", response_model=List[schemas.AttendanceResponse])
def read_attendance(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_attendance_list(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.AttendanceResponse, status_code=status.HTTP_201_CREATED)
def create_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(database.get_db)):
    return crud.create_attendance(db=db, attendance=attendance)