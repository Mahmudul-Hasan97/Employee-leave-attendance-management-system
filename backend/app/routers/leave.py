from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/leave", tags=["Leave"])

@router.get("/", response_model=List[schemas.LeaveRequest])
def read_leaves(db: Session = Depends(database.get_db)):
    return crud.get_leave_requests(db)

@router.post("/", response_model=schemas.LeaveRequest)
def create_leave(leave: schemas.LeaveRequestCreate, db: Session = Depends(database.get_db)):
    return crud.create_leave_request(db=db, leave=leave)

# নতুন যোগ করা হলো: Leave Status Update করার API
@router.put("/{leave_id}", response_model=schemas.LeaveRequest)
def update_leave_status(leave_id: int, status: str, db: Session = Depends(database.get_db)):
    db_leave = crud.update_leave_status(db, leave_id=leave_id, status=status)
    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave not found")
    return db_leave

@router.delete("/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(database.get_db)):
    db_leave = crud.delete_leave_request(db, leave_id=leave_id)
    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave not found")
    return {"message": "Leave deleted"}