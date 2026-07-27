from sqlalchemy.orm import Session
from . import models, schemas


def get_leave_requests(db: Session):
    return db.query(models.LeaveRequest).all()


def create_leave_request(db: Session, leave: schemas.LeaveRequestCreate):
    # Fallback to .dict() if on older Pydantic
    leave_data = leave.model_dump() if hasattr(leave, "model_dump") else leave.dict()
    
    db_leave = models.LeaveRequest(**leave_data)
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave
def delete_leave_request(db: Session, leave_id: int):
    db_leave = db.query(models.LeaveRequest).filter(models.LeaveRequest.id == leave_id).first()
    if db_leave:
        db.delete(db_leave)
        db.commit()
        return db_leave
    return None