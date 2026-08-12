from app.database import SessionLocal, engine, Base
from app.models import User, Attendance, LeaveRequest
from passlib.context import CryptContext
from datetime import date

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if users already exist
        if db.query(User).first():
            print("Database already seeded!")
            return

        # 1. Create Users
        admin_user = User(
            name="System Admin",
            email="admin@gmail.com",
            password=pwd_context.hash("admin123"),
            role="admin"
        )

        employee_user = User(
            name="John Doe",
            email="employee@gmail.com",
            password=pwd_context.hash("123456"),
            role="employee"
        )

        db.add(admin_user)
        db.add(employee_user)
        db.commit()
        db.refresh(employee_user)

        # 2. Create Sample Attendance
        att1 = Attendance(
            user_id=employee_user.id,
            date="2026-08-10",
            clock_in="09:00 AM",
            clock_out="05:00 PM",
            status="Present"
        )
        att2 = Attendance(
            user_id=employee_user.id,
            date="2026-08-11",
            clock_in="09:15 AM",
            clock_out="05:05 PM",
            status="Present"
        )

        # 3. Create Sample Leave Request
        leave1 = LeaveRequest(
            user_id=employee_user.id,
            start_date=date(2026, 8, 15),
            end_date=date(2026, 8, 18),
            reason="Sick Leave",
            status="Pending"
        )

        db.add(att1)
        db.add(att2)
        db.add(leave1)
        db.commit()

        print("Successfully seeded database with Users, Attendance, and Leaves!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()