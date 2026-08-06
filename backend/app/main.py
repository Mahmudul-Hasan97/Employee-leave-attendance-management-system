from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, employees, leave, attendance, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Leave & Attendance Management System")

# Allowed Origins (CORS Security Fix)
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://employee-leave-attendance-managemen.vercel.app",  # আপনার Vercel Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",  # Vercel-এর যেকোনো সাবডোমেইন অ্যালাউ করবে
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(leave.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Employee Leave & Attendance Management System API"}