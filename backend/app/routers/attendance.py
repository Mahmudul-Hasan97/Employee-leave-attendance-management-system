from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/api", tags=["Attendance"])

@router.post("/attendance/mark", response_model=schemas.AttendanceResponse)
def mark_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db, data)

@router.get("/attendance/my/{user_id}", response_model=List[schemas.AttendanceResponse])
def my_attendance(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_attendance(db, user_id)

@router.get("/admin/attendance", response_model=List[schemas.AttendanceResponse])
def all_attendance(db: Session = Depends(get_db)):
    return crud.get_all_attendance(db)

@router.put("/admin/attendance/{attendance_id}", response_model=schemas.AttendanceResponse)
def update_attendance(attendance_id: int, data: schemas.AttendanceUpdate, db: Session = Depends(get_db)):
    updated = crud.update_attendance(db, attendance_id, data.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return updated