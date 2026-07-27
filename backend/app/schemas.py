from pydantic import BaseModel, ConfigDict


class LeaveRequestBase(BaseModel):
    employee_name: str
    leave_type: str
    status: str


class LeaveRequestCreate(LeaveRequestBase):
    pass


class LeaveRequest(LeaveRequestBase):
    id: int

    # Pure Pydantic v2 configuration
    model_config = ConfigDict(from_attributes=True)