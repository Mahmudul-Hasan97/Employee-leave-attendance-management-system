from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Union
from .. import crud, schemas, database

router = APIRouter(
    prefix="/leave",
    tags=["Leave"]
)

@router.get("/", response_model=List[schemas.LeaveRequestResponse])
def read_leaves(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_leave_requests(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.LeaveRequestResponse, status_code=status.HTTP_201_CREATED)
def create_leave(leave: schemas.LeaveRequestCreate, db: Session = Depends(database.get_db)):
    return crud.create_leave_request(db=db, leave=leave)

@router.put("/{leave_id}", response_model=schemas.LeaveRequestResponse)
def update_leave_status(
    leave_id: int,
    status_update: Union[schemas.LeaveStatusUpdate, str] = None,
    status: str = None,
    db: Session = Depends(database.get_db)
):
    new_status = "Approved"
    if isinstance(status_update, schemas.LeaveStatusUpdate):
        new_status = status_update.status
    elif isinstance(status_update, str):
        new_status = status_update
    elif status:
        new_status = status

    db_leave = crud.update_leave_status(db=db, leave_id=leave_id, status=new_status)
    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return db_leave

@router.delete("/{leave_id}")
def delete_leave(leave_id: int, db: Session = Depends(database.get_db)):
    db_leave = crud.delete_leave_request(db=db, leave_id=leave_id)
    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return {"message": "Leave deleted"}