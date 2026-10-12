from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.subscription import Subscription
from app.schemas.subscription import SubscriptionCreate, SubscriptionUpdate, SubscriptionResponse

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.post("/", response_model=SubscriptionResponse)
def create_subscription(subscription: SubscriptionCreate, db: Session = Depends(get_db)):
	db_subscription = Subscription(**subscription.model_dump())
	db.add(db_subscription)
	db.commit()
	db.refresh(db_subscription)
	return db_subscription


@router.get("/", response_model=List[SubscriptionResponse])
def get_subscriptions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
	subscriptions = db.query(Subscription).offset(skip).limit(limit).all()
	return subscriptions


@router.get("/{subscription_id}", response_model=SubscriptionResponse)
def get_subscription(subscription_id: int, db: Session = Depends(get_db)):
	subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
	if not subscription:
		raise HTTPException(status_code=404, detail="Subscription not found")
	return subscription


@router.put("/{subscription_id}", response_model=SubscriptionResponse)
def update_subscription(subscription_id: int, subscription: SubscriptionUpdate, db: Session = Depends(get_db)):
	db_subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
	if not db_subscription:
		raise HTTPException(status_code=404, detail="Subscription not found")

	for key, value in subscription.model_dump(exclude_unset=True).items():
		setattr(db_subscription, key, value)

	db.commit()
	db.refresh(db_subscription)
	return db_subscription


@router.delete("/{subscription_id}")
def delete_subscription(subscription_id: int, db: Session = Depends(get_db)):
	db_subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
	if not db_subscription:
		raise HTTPException(status_code=404, detail="Subscription not found")

	db.delete(db_subscription)
	db.commit()
	return {"message": "Subscription deleted successfully"}