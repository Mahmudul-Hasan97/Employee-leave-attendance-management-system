from datetime import date as Date
from datetime import datetime
from typing import Literal, TypeAlias

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

EMAIL_PATTERN = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
AttendanceStatus: TypeAlias = Literal[
    "Pending",
    "Approved",
    "Rejected",
    "Present",
    "Absent",
]
LeaveStatus: TypeAlias = Literal["Pending", "Approved", "Rejected"]


class LoginRequest(BaseModel):
    email: str | None = None
    username: str | None = None
    password: str
    role: str | None = None


class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: str = Field(pattern=EMAIL_PATTERN, max_length=255)
    password: str = Field(min_length=8, max_length=128)
    role: Literal["employee", "admin"] = "employee"

    @field_validator("name", "email", mode="before")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str


class ProfileUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=255)

    @field_validator("name", mode="before")
    @classmethod
    def strip_name(cls, value: str) -> str:
        return value.strip()


class AttendanceCreate(BaseModel):
    user_id: int = Field(ge=1)
    date: Date = Field(default_factory=Date.today)
    clock_in: str = Field(min_length=1, max_length=20)

    @field_validator("clock_in")
    @classmethod
    def validate_clock_in(cls, value: str) -> str:
        value = value.strip()
        for time_format in ("%H:%M", "%I:%M %p"):
            try:
                return datetime.strptime(value, time_format).strftime(time_format)
            except ValueError:
                continue
        raise ValueError("clock_in must use HH:MM or HH:MM AM/PM format")


class AttendanceUpdate(BaseModel):
    status: AttendanceStatus


class AttendanceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    user_name: str
    date: str
    clock_in: str
    clock_out: str | None = None
    status: str


class LeaveRequestCreate(BaseModel):
    user_id: int = Field(ge=1)
    start_date: Date
    end_date: Date
    reason: str = Field(min_length=1, max_length=2000)

    @field_validator("reason", mode="before")
    @classmethod
    def strip_reason(cls, value: str) -> str:
        return value.strip()

    @model_validator(mode="after")
    def validate_date_range(self):
        if self.end_date < self.start_date:
            raise ValueError("end_date must be on or after start_date")
        return self


class LeaveStatusUpdate(BaseModel):
    status: LeaveStatus


class LeaveRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    user_name: str
    start_date: str
    end_date: str
    reason: str
    status: str
