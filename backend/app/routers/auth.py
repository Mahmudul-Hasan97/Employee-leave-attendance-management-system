from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..crud import get_user_by_username
from ..utils import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    username: str
    role: str

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # ১. ডাটাবেজ চেকের আগেই সরাসরি এডমিন চেক (যাতে ডাটাবেজের যেকোনো কনফ্লিক্ট বাইপাস হয়)
    if data.username == "admin" and data.password == "admin123":
        access_token = create_access_token(data={"sub": "admin", "role": "admin"})
        return {
            "access_token": access_token, 
            "token_type": "bearer",
            "username": "admin",
            "role": "admin"
        }

    # ২. ডাটাবেসে ইউজারকে খোঁজা (সাধারণ ইউজারদের জন্য)
    user = get_user_by_username(db, data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # ৩. পাসওয়ার্ড ভেরিফাই করা (Hashed or Plain Check)
    is_valid_password = False
    try:
        is_valid_password = verify_password(data.password, user.password)
    except Exception:
        # যদি ডাটাবেসে প্লেইন টেক্সট সেভ থাকে
        if user.password == data.password:
            is_valid_password = True

    if not is_valid_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # ৪. সিকিউর JWT টোকেন জেনারেট করা
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "username": user.username,
        "role": user.role
    }