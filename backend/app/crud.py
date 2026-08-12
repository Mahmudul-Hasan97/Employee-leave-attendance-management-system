from sqlalchemy.orm import Session
from datetime import date
from app import models, schemas

# --- User CRUD ---
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_all_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password,
        role=user.role.lower()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Attendance CRUD ---
def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    db_attendance = models.Attendance(
        user_id=attendance.user_id,
        date=str(date.today()),
        clock_in=attendance.clock_in,
        status="Present"
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

def get_user_attendance(db: Session, user_id: int):
    return db.query(models.Attendance).filter(models.Attendance.user_id == user_id).all()

def get_all_attendance(db: Session):
    return db.query(models.Attendance).all()

def update_attendance(db: Session, attendance_id: int, status: str):
    record = db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()
    if record:
        record.status = status
        db.commit()
        db.refresh(record)
    return record

# --- Leave CRUD ---
def create_leave_request(db: Session, leave: schemas.LeaveRequestCreate):
    db_leave = models.LeaveRequest(
        user_id=leave.user_id,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="Pending"
    )
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave

def get_user_leaves(db: Session, user_id: int):
    return db.query(models.LeaveRequest).filter(models.LeaveRequest.user_id == user_id).all()

def get_all_leaves(db: Session):
    return db.query(models.LeaveRequest).all()

def update_leave_status(db: Session, leave_id: int, status: str):
    leave = db.query(models.LeaveRequest).filter(models.LeaveRequest.id == leave_id).first()
    if leave:
        leave.status = status
        db.commit()
        db.refresh(leave)
    return leave

def delete_leave_request(db: Session, leave_id: int):
    leave = db.query(models.LeaveRequest).filter(models.LeaveRequest.id == leave_id).first()
    if leave:
        db.delete(leave)
        db.commit()
        return True
    return False