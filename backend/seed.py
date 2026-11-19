from datetime import date

from app import models
from app.database import SessionLocal, initialize_database
from app.utils import get_password_hash

DEMO_USERS = (
    ("System Admin", "admin@gmail.com", "admin123", "admin"),
    ("John Doe", "employee@gmail.com", "employee123", "employee"),
)


def seed_database() -> None:
    initialize_database()
    with SessionLocal() as db, db.begin():
        users = {}
        for name, email, password, role in DEMO_USERS:
            user = db.query(models.User).filter(models.User.email == email).first()
            if user is None:
                user = models.User(
                    name=name,
                    email=email,
                    password=get_password_hash(password),
                    role=role,
                )
                db.add(user)
                db.flush()
            elif not user.password:
                user.password = get_password_hash(password)
            users[email] = user

        employee = users["employee@gmail.com"]
        if not db.query(models.Attendance).filter(
            models.Attendance.user_id == employee.id
        ).first():
            db.add_all(
                [
                    models.Attendance(
                        user_id=employee.id,
                        user_name=employee.name,
                        date="2026-08-10",
                        clock_in="09:00 AM",
                        clock_out="05:00 PM",
                        status="Present",
                    ),
                    models.Attendance(
                        user_id=employee.id,
                        user_name=employee.name,
                        date="2026-08-11",
                        clock_in="09:15 AM",
                        clock_out="05:05 PM",
                        status="Present",
                    ),
                ]
            )

        if not db.query(models.LeaveRequest).filter(
            models.LeaveRequest.user_id == employee.id
        ).first():
            db.add(
                models.LeaveRequest(
                    user_id=employee.id,
                    user_name=employee.name,
                    start_date=date(2026, 8, 15).isoformat(),
                    end_date=date(2026, 8, 18).isoformat(),
                    reason="Sick Leave",
                    status="Pending",
                )
            )
    print("Database is ready. Demo accounts: admin@gmail.com / admin123 and employee@gmail.com / employee123.")


if __name__ == "__main__":
    seed_database()
