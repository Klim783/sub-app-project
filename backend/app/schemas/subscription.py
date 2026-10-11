from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.subscription import SubscriptionStatus

class SubscriptionBase(BaseModel):
	name: str
	provider: str
	price: float
	currency: str = "USD"
	billing_cycle : str

class SubscriptionCreate(BaseModel):
	user_id: int
	next_billing_date: Optional[datetime] = None


class SubscriptionUpdate(BaseModel):
	name: Optional[str] = None
	provider: Optional[str] = None
	price: Optional[float] = None
	billing_cycle: Optional[str] = None
	status: Optional[SubscriptionStatus] = None
	next_billing_date: Optional[datetime] = None

class SubscriptionResponse(SubscriptionBase):
	id: int
	user_id: int
	status: SubscriptionStatus
	start_date: datetime
	next_billing_date: Optional[datetime] = None
	created_at: datetime
	updated_at: Optional[datetime] = None

class Config:
	from_attributes = True