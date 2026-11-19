from sqlalchemy.orm import Session

from app import models, schemas
from app.utils import get_password_hash


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email.strip().lower()).first()


def get_all_users(db: Session):
    return db.query(models.User).order_by(models.User.id).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name.strip(),
        email=user.email.strip().lower(),
        password=get_password_hash(user.password),
        role=user.role.lower(),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_attendance(
    db: Session,
    attendance: schemas.AttendanceCreate,
    user_name: str | None = None,
):
    user = db.query(models.User).filter(models.User.id == attendance.user_id).first()
    db_attendance = models.Attendance(
        user_id=attendance.user_id,
        user_name=user_name or (user.name if user else "Employee"),
        date=attendance.date.isoformat(),
        clock_in=attendance.clock_in,
        status="Pending",
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


def get_user_attendance(db: Session, user_id: int):
    return (
        db.query(models.Attendance)
        .filter(models.Attendance.user_id == user_id)
        .order_by(models.Attendance.date.desc(), models.Attendance.id.desc())
        .all()
    )


def get_all_attendance(db: Session):
    return (
        db.query(models.Attendance)
        .order_by(models.Attendance.date.desc(), models.Attendance.id.desc())
        .all()
    )


def update_attendance(
    db: Session,
    attendance_id: int,
    status: str | None = None,
):
    record = (
        db.query(models.Attendance)
        .filter(models.Attendance.id == attendance_id)
        .first()
    )
    if record:
        if status is not None:
            record.status = status
        db.commit()
        db.refresh(record)
    return record


def create_leave_request(
    db: Session,
    leave: schemas.LeaveRequestCreate,
    user_name: str | None = None,
):
    user = db.query(models.User).filter(models.User.id == leave.user_id).first()
    db_leave = models.LeaveRequest(
        user_id=leave.user_id,
        user_name=user_name or (user.name if user else "Employee"),
        start_date=leave.start_date.isoformat(),
        end_date=leave.end_date.isoformat(),
        reason=leave.reason.strip(),
        status="Pending",
    )
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave


def get_user_leaves(db: Session, user_id: int):
    return (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.user_id == user_id)
        .order_by(models.LeaveRequest.start_date.desc(), models.LeaveRequest.id.desc())
        .all()
    )


def get_all_leaves(db: Session):
    return (
        db.query(models.LeaveRequest)
        .order_by(models.LeaveRequest.start_date.desc(), models.LeaveRequest.id.desc())
        .all()
    )


def update_leave_status(db: Session, leave_id: int, status: str):
    leave = (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.id == leave_id)
        .first()
    )
    if leave:
        leave.status = status
        db.commit()
        db.refresh(leave)
    return leave


def delete_leave_request(db: Session, leave_id: int):
    leave = (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.id == leave_id)
        .first()
    )
    if leave:
        db.delete(leave)
        db.commit()
        return True
    return False


def delete_attendance(db: Session, attendance_id: int):
    record = (
        db.query(models.Attendance)
        .filter(models.Attendance.id == attendance_id)
        .first()
    )
    if record:
        db.delete(record)
        db.commit()
        return True
    return False
