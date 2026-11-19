from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="employee")

    attendances = relationship(
        "Attendance",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    leaves = relationship(
        "LeaveRequest",
        back_populates="user",
        cascade="all, delete-orphan",
    )


class Attendance(Base):
    __tablename__ = "attendances"
    __table_args__ = (
        UniqueConstraint("user_id", "date", name="uq_attendance_user_date"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    clock_in = Column(String, nullable=False)
    clock_out = Column(String, nullable=True)
    status = Column(String, nullable=False, default="Pending")

    user = relationship("User", back_populates="attendances")


class LeaveRequest(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_name = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    reason = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Pending")

    user = relationship("User", back_populates="leaves")
