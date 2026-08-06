from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("/", response_model=List[schemas.EmployeeResponse])
def read_employees(db: Session = Depends(database.get_db)):
    return crud.get_employees(db)

@router.post("/", response_model=schemas.EmployeeResponse)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    return crud.create_employee(db=db, emp=emp)

# নতুন যোগ করা হলো: Employee Update API
@router.put("/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(emp_id: int, emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    db_emp = crud.update_employee(db, emp_id=emp_id, emp=emp)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_emp

@router.delete("/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(database.get_db)):
    db_emp = crud.delete_employee(db, emp_id=emp_id)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"}