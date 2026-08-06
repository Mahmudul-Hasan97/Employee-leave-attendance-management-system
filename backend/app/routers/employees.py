from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.get("/", response_model=List[schemas.EmployeeResponse])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_employees(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    return crud.create_employee(db=db, employee=emp)

@router.put("/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(emp_id: int, emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    db_emp = crud.update_employee(db=db, employee_id=emp_id, employee=emp)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_emp

@router.delete("/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(database.get_db)):
    db_emp = crud.delete_employee(db=db, employee_id=emp_id)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}