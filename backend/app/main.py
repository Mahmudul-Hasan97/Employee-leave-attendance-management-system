from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import employees, leave, attendance, auth
from . import models, crud
from .database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Management System")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# রাউটারগুলো যুক্ত করা হলো
app.include_router(auth.router) # নতুন লগইন রাউটার
app.include_router(employees.router)
app.include_router(leave.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return {"message": "Welcome to Employee Management API"}

@app.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_employees = db.query(models.Employee).count()
    present = db.query(models.Attendance).filter(models.Attendance.status == "Present").count()
    absent = db.query(models.Attendance).filter(models.Attendance.status == "Absent").count()
    pending_leave = db.query(models.LeaveRequest).filter(models.LeaveRequest.status == "Pending").count()
    
    return {
        "total_employees": total_employees,
        "present": present,
        "absent": absent,
        "pending_leave": pending_leave
    }