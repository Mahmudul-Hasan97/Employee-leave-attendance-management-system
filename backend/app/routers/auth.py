from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/api", tags=["Auth"])

@router.post("/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, req.email)
    
    # Verify hashed password with passlib
    if not user or not pwd_context.verify(req.password, user.password) or user.role.lower() != req.role.lower():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or role mismatch"
        )
    
    return {
        "token": "fake-jwt-token-string",
        "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}
    }