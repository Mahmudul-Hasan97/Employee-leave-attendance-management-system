import io
import csv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from app.database import get_db, Base, engine

router = APIRouter()

# --- Database Models ---
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="employee")

class DBAttendance(Base):
    __tablename__ = "attendances"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_name = Column(String)
    date = Column(String)
    clock_in = Column(String)
    clock_out = Column(String, default="-")
    status = Column(String, default="Pending")

class DBLeave(Base):
    __tablename__ = "leaves"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_name = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    reason = Column(String)
    status = Column(String, default="Pending")

# Create Database Tables Automatically
Base.metadata.create_all(bind=engine)

# --- Pydantic Schemas ---
class EmployeeCreate(BaseModel):
    name: str
    email: str
    role: str = "employee"

class LeaveCreate(BaseModel):
    user_id: int
    user_name: str
    start_date: str
    end_date: str
    reason: str

class StatusUpdate(BaseModel):
    status: str

class AttendanceCreate(BaseModel):
    user_id: int
    user_name: str
    date: str
    clock_in: str

# --- Auth Endpoint ---
@router.post("/auth/login")
@router.post("/login")
def login(credentials: dict, db: Session = Depends(get_db)):
    email = credentials.get("email", "")
    user = db.query(DBUser).filter(DBUser.email == email).first()
    
    if not user:
        is_admin = "admin" in email.lower()
        user_name = "System Admin" if is_admin else email.split("@")[0].capitalize()
        role = "admin" if is_admin else "employee"
        user = DBUser(name=user_name, email=email, role=role)
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "access_token": "token-xyz-123",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

# --- Dashboard Stats Endpoint ---
@router.get("/dashboard/stats")
@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_employees = db.query(DBUser).filter(DBUser.role == "employee").count()
    if total_employees == 0:
        total_employees = db.query(DBUser).count()
        
    total_attendance = db.query(DBAttendance).count()
    total_leaves = db.query(DBLeave).count()
    pending_leaves = db.query(DBLeave).filter(DBLeave.status == "Pending").count()
    pending_attendances = db.query(DBAttendance).filter(DBAttendance.status == "Pending").count()

    return {
        "total_employees": total_employees,
        "total_attendance": total_attendance,
        "total_leaves": total_leaves,
        "pending_leaves": pending_leaves,
        "pending_attendances": pending_attendances
    }

# --- Report Download Endpoint (NEW FIX) ---
@router.get("/reports/download")
def download_report(db: Session = Depends(get_db)):
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write Header
    writer.writerow(["Record Type", "Employee Name", "Date / Start Date", "Clock In / End Date", "Reason / Detail", "Status"])
    
    # Write Attendance Data
    attendances = db.query(DBAttendance).all()
    for att in attendances:
        writer.writerow(["Attendance", att.user_name or "N/A", att.date, att.clock_in, "-", att.status])
        
    # Write Leave Data
    leaves = db.query(DBLeave).all()
    for l in leaves:
        writer.writerow(["Leave Request", l.user_name or "N/A", l.start_date, l.end_date, l.reason, l.status])
        
    output.seek(0)
    
    response = StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = "attachment; filename=System_Report.csv"
    return response

# --- Employee Endpoints ---
@router.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return db.query(DBUser).all()

@router.post("/employees")
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    new_user = DBUser(name=emp.name, email=emp.email, role=emp.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = db.query(DBUser).filter(DBUser.id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
    return {"message": "Employee deleted"}

# --- Leave Endpoints ---
@router.get("/leaves")
def get_leaves(db: Session = Depends(get_db)):
    return db.query(DBLeave).all()

@router.post("/leaves")
def create_leave(leave: LeaveCreate, db: Session = Depends(get_db)):
    new_leave = DBLeave(
        user_id=leave.user_id,
        user_name=leave.user_name,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="Pending"
    )
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

@router.put("/leaves/{leave_id}")
def update_leave_status(leave_id: int, update: StatusUpdate, db: Session = Depends(get_db)):
    leave = db.query(DBLeave).filter(DBLeave.id == leave_id).first()
    if leave:
        leave.status = update.status
        db.commit()
        db.refresh(leave)
    return leave

@router.delete("/leaves/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = db.query(DBLeave).filter(DBLeave.id == leave_id).first()
    if leave:
        db.delete(leave)
        db.commit()
    return {"message": "Leave deleted"}

# --- Attendance Endpoints ---
@router.get("/attendance")
def get_attendance(db: Session = Depends(get_db)):
    return db.query(DBAttendance).all()

@router.post("/attendance")
def create_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    new_att = DBAttendance(
        user_id=att.user_id,
        user_name=att.user_name,
        date=att.date,
        clock_in=att.clock_in,
        clock_out="-",
        status="Pending"
    )
    db.add(new_att)
    db.commit()
    db.refresh(new_att)
    return new_att

@router.put("/attendance/{att_id}")
def update_attendance_status(att_id: int, update: StatusUpdate, db: Session = Depends(get_db)):
    att = db.query(DBAttendance).filter(DBAttendance.id == att_id).first()
    if att:
        att.status = update.status
        db.commit()
        db.refresh(att)
    return att

@router.delete("/attendance/{att_id}")
def delete_attendance(att_id: int, db: Session = Depends(get_db)):
    att = db.query(DBAttendance).filter(DBAttendance.id == att_id).first()
    if att:
        db.delete(att)
        db.commit()
    return {"message": "Attendance log deleted"}