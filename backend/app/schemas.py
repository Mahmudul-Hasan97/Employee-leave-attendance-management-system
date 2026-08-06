from pydantic import BaseModel
from typing import Optional, Union

# ==================== USER SCHEMAS ====================
class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    role: Optional[str] = "employee"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: Optional[bool] = True

    class Config:
        from_attributes = True

User = UserResponse

# ==================== EMPLOYEE SCHEMAS ====================
class EmployeeBase(BaseModel):
    name: str
    email: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    phone: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True

Employee = EmployeeResponse

# ==================== ATTENDANCE SCHEMAS ====================
class AttendanceBase(BaseModel):
    employee_id: Optional[Union[int, str]] = None
    employee_name: Optional[str] = None
    date: Optional[str] = None
    status: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int

    class Config:
        from_attributes = True

Attendance = AttendanceResponse

# ==================== LEAVE REQUEST SCHEMAS ====================
class LeaveRequestBase(BaseModel):
    employee_id: Optional[Union[int, str]] = None
    employee_name: Optional[str] = "Employee"
    leave_type: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    reason: Optional[str] = None
    status: Optional[str] = "Pending"

class LeaveRequestCreate(LeaveRequestBase):
    pass

class LeaveRequestResponse(LeaveRequestBase):
    id: int

    class Config:
        from_attributes = True

class LeaveStatusUpdate(BaseModel):
    status: str

# Compatibility Aliases
LeaveRequest = LeaveRequestResponse
LeaveBase = LeaveRequestBase
LeaveCreate = LeaveRequestCreate
LeaveResponse = LeaveRequestResponse
Leave = LeaveRequestResponse