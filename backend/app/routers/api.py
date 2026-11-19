import csv
import io

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.database import get_db
from app.dependencies import get_current_user, require_admin
from app.utils import create_access_token, verify_password

router = APIRouter()


def _is_admin(user: models.User) -> bool:
    return user.role.lower() == "admin"


def _require_owner_or_admin(user_id: int, current_user: models.User) -> None:
    if user_id != current_user.id and not _is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You may only access your own records",
        )


def _employee_or_404(db: Session, user_id: int) -> models.User:
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return user


@router.get("/")
def root():
    return {"status": "ok", "message": "Employee Management System API is running"}


@router.post("/auth/login")
@router.post("/login")
def login(
    credentials: schemas.LoginRequest,
    db: Session = Depends(get_db),
):
    email = (credentials.email or credentials.username or "").strip().lower()
    user = crud.get_user_by_email(db, email) if email else None
    valid_password = bool(
        user
        and user.password
        and verify_password(credentials.password, user.password)
    )
    if (
        not valid_password
        or (
            credentials.role is not None
            and credentials.role.lower() != user.role.lower()
        )
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "access_token": create_access_token(user.email),
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }


@router.get("/dashboard/stats")
@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    total_employees = db.query(models.User).filter(models.User.role == "employee").count()

    attendance_query = db.query(models.Attendance)
    leave_query = db.query(models.LeaveRequest)
    if not _is_admin(current_user):
        attendance_query = attendance_query.filter(
            models.Attendance.user_id == current_user.id
        )
        leave_query = leave_query.filter(models.LeaveRequest.user_id == current_user.id)

    return {
        "total_employees": total_employees,
        "total_attendance": attendance_query.count(),
        "total_leaves": leave_query.count(),
        "pending_leaves": leave_query.filter(
            models.LeaveRequest.status == "Pending"
        ).count(),
        "pending_attendances": attendance_query.filter(
            models.Attendance.status == "Pending"
        ).count(),
    }


def _safe_csv_value(value: str | None) -> str:
    text = value or ""
    if text.startswith(("=", "+", "-", "@", "\t", "\r")):
        return "'" + text
    return text


@router.get("/reports/download")
def download_report(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    attendances = (
        crud.get_all_attendance(db)
        if _is_admin(current_user)
        else crud.get_user_attendance(db, current_user.id)
    )
    leaves = (
        crud.get_all_leaves(db)
        if _is_admin(current_user)
        else crud.get_user_leaves(db, current_user.id)
    )

    output = io.StringIO(newline="")
    writer = csv.writer(output)
    writer.writerow(
        [
            "Record Type",
            "Employee Name",
            "Date / Start Date",
            "Clock In / End Date",
            "Reason / Detail",
            "Status",
        ]
    )
    for attendance in attendances:
        writer.writerow(
            [
                "Attendance",
                _safe_csv_value(attendance.user_name),
                attendance.date,
                attendance.clock_in,
                _safe_csv_value(attendance.clock_out),
                attendance.status,
            ]
        )
    for leave in leaves:
        writer.writerow(
            [
                "Leave Request",
                _safe_csv_value(leave.user_name),
                leave.start_date,
                leave.end_date,
                _safe_csv_value(leave.reason),
                leave.status,
            ]
        )

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=System_Report.csv"},
    )


@router.get("/employees", response_model=list[schemas.UserResponse])
def get_employees(
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    return crud.get_all_users(db)


@router.post(
    "/employees",
    response_model=schemas.UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee(
    employee: schemas.UserCreate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    if crud.get_user_by_email(db, employee.email):
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    try:
        return crud.create_user(db, employee)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="An account with this email already exists") from exc


@router.put("/employees/{employee_id}", response_model=schemas.UserResponse)
def update_employee(
    employee_id: int,
    profile: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    _require_owner_or_admin(employee_id, current_user)
    employee = _employee_or_404(db, employee_id)
    employee.name = profile.name
    db.commit()
    db.refresh(employee)
    return employee


@router.delete("/employees/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_admin),
):
    employee = _employee_or_404(db, employee_id)
    if employee.id == current_user.id:
        raise HTTPException(status_code=409, detail="You cannot delete your own account")
    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted"}


@router.get("/attendance", response_model=list[schemas.AttendanceResponse])
def get_attendance(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if _is_admin(current_user):
        return crud.get_all_attendance(db)
    return crud.get_user_attendance(db, current_user.id)


@router.post(
    "/attendance",
    response_model=schemas.AttendanceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_attendance(
    attendance: schemas.AttendanceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user_id = attendance.user_id if _is_admin(current_user) else current_user.id
    employee = _employee_or_404(db, user_id)
    duplicate = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.user_id == user_id,
            models.Attendance.date == attendance.date.isoformat(),
        )
        .first()
    )
    if duplicate:
        raise HTTPException(
            status_code=409,
            detail="Attendance has already been submitted for this date",
        )

    attendance.user_id = user_id
    try:
        return crud.create_attendance(db, attendance, employee.name)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Attendance has already been submitted for this date",
        ) from exc


@router.put("/attendance/{attendance_id}", response_model=schemas.AttendanceResponse)
def update_attendance_status(
    attendance_id: int,
    update: schemas.AttendanceUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    attendance = crud.update_attendance(db, attendance_id, update.status)
    if attendance is None:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return attendance


@router.delete("/attendance/{attendance_id}")
def delete_attendance(
    attendance_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    attendance = (
        db.query(models.Attendance)
        .filter(models.Attendance.id == attendance_id)
        .first()
    )
    if attendance is None:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    _require_owner_or_admin(attendance.user_id, current_user)
    crud.delete_attendance(db, attendance_id)
    return {"message": "Attendance log deleted"}


@router.get("/leaves", response_model=list[schemas.LeaveRequestResponse])
def get_leaves(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if _is_admin(current_user):
        return crud.get_all_leaves(db)
    return crud.get_user_leaves(db, current_user.id)


@router.post(
    "/leaves",
    response_model=schemas.LeaveRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_leave(
    leave: schemas.LeaveRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user_id = leave.user_id if _is_admin(current_user) else current_user.id
    employee = _employee_or_404(db, user_id)
    leave.user_id = user_id
    return crud.create_leave_request(db, leave, employee.name)


@router.put("/leaves/{leave_id}", response_model=schemas.LeaveRequestResponse)
def update_leave_status(
    leave_id: int,
    update: schemas.LeaveStatusUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    leave = crud.update_leave_status(db, leave_id, update.status)
    if leave is None:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return leave


@router.delete("/leaves/{leave_id}")
def delete_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    leave = (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.id == leave_id)
        .first()
    )
    if leave is None:
        raise HTTPException(status_code=404, detail="Leave request not found")
    _require_owner_or_admin(leave.user_id, current_user)
    crud.delete_leave_request(db, leave_id)
    return {"message": "Leave request deleted successfully"}
