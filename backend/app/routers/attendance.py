from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.get("/", response_model=list[schemas.AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()

@router.post("/", response_model=schemas.AttendanceResponse)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    new_att = models.Attendance(**att.dict())
    db.add(new_att)
    db.commit()
    db.refresh(new_att)
    return new_att