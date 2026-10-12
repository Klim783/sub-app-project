from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
	db_user = db.query(User).filter(User.email == user.email).first()
	if db_user:
		raise HTTPException(status_code=400, detail="Email already registered")

	from passlib.context import CryptContext
	pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
	hashed_password = pwd_context.hash(user.password)

	db_user = User(
		email=user.email,
		username=user.username,
		hashed_password=hashed_password
	)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user


@router.get("/", response_model=List[UserResponse])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
	users = db.query(User).offset(skip).limit(limit).all()
	return users


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
	user = db.query(User).filter(User.id == user_id).first()
	if not user:
		raise HTTPException(status_code=404, detail="User not found")
	return user