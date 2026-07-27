from sqlalchemy import Column, Integer, String
from .database import Base


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String(100))
    leave_type = Column(String(100))
    status = Column(String(50))