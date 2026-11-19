from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db
from app.utils import create_access_token, verify_password

router = APIRouter(prefix="/api", tags=["Auth"])


@router.post("/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    email = (req.email or req.username or "").strip().lower()
    user = crud.get_user_by_email(db, email) if email else None
    valid_password = bool(
        user and user.password and verify_password(req.password, user.password)
    )
    if (
        not valid_password
        or (req.role is not None and req.role.lower() != user.role.lower())
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "access_token": create_access_token(user.email),
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }
