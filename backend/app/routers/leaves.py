from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/api", tags=["Leave Requests"])

@router.post("/leave/request", response_model=schemas.LeaveRequestResponse)
def apply_leave(data: schemas.LeaveRequestCreate, db: Session = Depends(get_db)):
    return crud.create_leave_request(db, data)

@router.get("/leave/my/{user_id}", response_model=List[schemas.LeaveRequestResponse])
def my_leaves(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_leaves(db, user_id)

@router.get("/admin/leaves", response_model=List[schemas.LeaveRequestResponse])
def all_leaves(db: Session = Depends(get_db)):
    return crud.get_all_leaves(db)

@router.put("/admin/leave/{leave_id}", response_model=schemas.LeaveRequestResponse)
def update_leave_status(leave_id: int, data: schemas.LeaveStatusUpdate, db: Session = Depends(get_db)):
    updated = crud.update_leave_status(db, leave_id, data.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return updated

@router.delete("/admin/leave/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(get_db)):
    success = crud.delete_leave_request(db, leave_id)
    if not success:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return {"message": "Leave request deleted successfully"}