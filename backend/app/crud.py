from sqlalchemy.orm import Session
from . import models, schemas
from .utils import hash_password

# ==================== USER AUTHENTICATION ====================

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pwd = hash_password(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_pwd,
        role=user.role if hasattr(user, 'role') else "employee"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ==================== EMPLOYEE MANAGEMENT ====================

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employee).offset(skip).limit(limit).all()

def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        name=employee.name,
        email=employee.email,
        department=employee.department,
        designation=employee.designation,
        phone=employee.phone
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if employee:
        db.delete(employee)
        db.commit()
        return True
    return False

# ==================== ATTENDANCE MANAGEMENT ====================

def get_attendance_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Attendance).offset(skip).limit(limit).all()

def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    db_attendance = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

# ==================== LEAVE MANAGEMENT ====================

def get_leave_requests(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.LeaveRequest).offset(skip).limit(limit).all()

def create_leave_request(db: Session, leave: schemas.LeaveRequestCreate):
    db_leave = models.LeaveRequest(
        employee_id=leave.employee_id,
        leave_type=leave.leave_type,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="Pending"
    )
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave

def update_leave_status(db: Session, leave_id: int, status: str):
    leave = db.query(models.LeaveRequest).filter(models.LeaveRequest.id == leave_id).first()
    if leave:
        leave.status = status
        db.commit()
        db.refresh(leave)
        return leave
    return None

# ==================== DASHBOARD STATS ====================

def get_dashboard_stats(db: Session):
    total_employees = db.query(models.Employee).count()
    pending_leaves = db.query(models.LeaveRequest).filter(models.LeaveRequest.status == "Pending").count()
    approved_leaves = db.query(models.LeaveRequest).filter(models.LeaveRequest.status == "Approved").count()
    present_today = db.query(models.Attendance).filter(models.Attendance.status == "Present").count()

    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "pending_leaves": pending_leaves,
        "approved_leaves": approved_leaves
    }