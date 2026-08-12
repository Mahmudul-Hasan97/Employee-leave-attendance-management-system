from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/summary/{user_id}")
def get_summary(user_id: int, db: Session = Depends(get_db)):
    user_attendance = crud.get_user_attendance(db, user_id)
    user_leaves = crud.get_user_leaves(db, user_id)
    return {
        "attendance_count": len(user_attendance),
        "total_leaves": len(user_leaves),
        "pending_leaves": len([l for l in user_leaves if l.status == "Pending"])
    }