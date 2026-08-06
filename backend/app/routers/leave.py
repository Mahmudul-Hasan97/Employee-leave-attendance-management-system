from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(
    prefix="/leave",
    tags=["Leave"]
)

# 1. READ (GET) - সকল লিভ রিকোয়েস্ট দেখা
@router.get("/", response_model=List[schemas.LeaveRequestResponse])
def read_leaves(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_leave_requests(db, skip=skip, limit=limit)

# 2. CREATE (POST) - নতুন লিভ রিকোয়েস্ট তৈরি করা
@router.post("/", response_model=schemas.LeaveRequestResponse, status_code=status.HTTP_201_CREATED)
def create_leave(leave: schemas.LeaveRequestCreate, db: Session = Depends(database.get_db)):
    return crud.create_leave_request(db=db, leave=leave)

# 3. UPDATE (PUT) - ক্লিন ও স্ট্যান্ডার্ড আপডেট মেথড
@router.put("/{leave_id}", response_model=schemas.LeaveRequestResponse)
def update_leave_status(
    leave_id: int,
    status_update: schemas.LeaveStatusUpdate,
    db: Session = Depends(database.get_db)
):
    db_leave = crud.update_leave_status(db=db, leave_id=leave_id, status=status_update.status)
    if db_leave is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Leave request not found"
        )
    return db_leave

# 4. DELETE (DELETE) - লিভ রিকোয়েস্ট ডিলেট করা
@router.delete("/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(database.get_db)):
    db_leave = crud.delete_leave_request(db=db, leave_id=leave_id)
    if db_leave is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Leave request not found"
        )
    return {"message": "Leave request deleted successfully"}