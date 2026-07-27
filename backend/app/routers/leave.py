from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/leave",
    tags=["Leave Requests"]
)

@router.get("/", response_model=List[schemas.LeaveRequest])
def read_leaves(db: Session = Depends(get_db)):
    return crud.get_leave_requests(db)

@router.post("/", response_model=schemas.LeaveRequest, status_code=status.HTTP_201_CREATED)
def create_leave(leave: schemas.LeaveRequestCreate, db: Session = Depends(get_db)):
    return crud.create_leave_request(db=db, leave=leave)
@router.delete("/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(get_db)):
    deleted_leave = crud.delete_leave_request(db, leave_id=leave_id)
    if deleted_leave is None:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return {"message": "Leave request deleted successfully"}