from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, SessionLocal
from app import models, utils
from app.routers import auth, employees, leave, attendance, dashboard

# ১. ডাটাবেজ টেবিলগুলো না থাকলে অটো তৈরি করবে
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Management System API")

# ২. CORS সেটিংস (Vercel ও Localhost উভয় পরিবেশের জন্য)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # বা নির্দিষ্ট ফ্রন্টএন্ড URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ৩. 🚀 অটো-সিডিং: সার্ভার চালুর সাথে সাথে অ্যাডমিন ইউজার তৈরি করবে
@app.on_event("startup")
def startup_db_seed():
    db = SessionLocal()
    try:
        admin_user = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin_user:
            new_admin = models.User(
                username="admin",
                email="admin@example.com",
                password=utils.hash_password("admin"),
                role="admin"
            )
            db.add(new_admin)
            db.commit()
            print("🎉 Default admin user created successfully! (Username: admin, Password: admin)")
        else:
            print("✅ Admin user already exists in database.")
    except Exception as e:
        print("Seed Error:", e)
    finally:
        db.close()

# ৪. রাউটারসমূহ ইনক্লুড করা
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(leave.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Employee Leave & Attendance Management System API"}