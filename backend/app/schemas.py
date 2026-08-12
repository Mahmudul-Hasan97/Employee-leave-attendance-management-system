from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    user_id: int
    clock_in: str

class AttendanceUpdate(BaseModel):
    status: Optional[str] = None
    clock_in: Optional[str] = None
    clock_out: Optional[str] = None

class AttendanceResponse(BaseModel):
    id: int
    user_id: int
    date: str
    clock_in: str
    clock_out: Optional[str] = None
    status: str

    class Config:
        from_attributes = True

class LeaveRequestCreate(BaseModel):
    user_id: int
    start_date: date
    end_date: date
    reason: str

class LeaveStatusUpdate(BaseModel):
    status: str

class LeaveRequestResponse(BaseModel):
    id: int
    user_id: int
    start_date: date
    end_date: date
    reason: str
    status: str

    class Config:
        from_attributes = True