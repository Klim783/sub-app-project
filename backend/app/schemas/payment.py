from pydantic import BaseModel
from datetime import datetime

class PaymentBase(BaseModel):
	amount: float
	currency: str = "USD"
	status: str = "completed"

class PaymentCreate(PaymentBase):
	subscription_id: int

class PaymentResponse(PaymentBase):
	id: int
	subscription_id: int
	payment_date: datetime

class Config:
	from_attributes = True
