from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return {
        "total_employees": db.query(models.Employee).count(),
        "present": db.query(models.Attendance).filter(models.Attendance.status == "Present").count(),
        "absent": db.query(models.Attendance).filter(models.Attendance.status == "Absent").count(),
        "pending_leave": db.query(models.LeaveRequest).filter(models.LeaveRequest.status == "Pending").count()
    }