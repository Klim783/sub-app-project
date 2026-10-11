from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class SubscriptionStatus(str, enum.Enum):
	ACTIVE = "active"
	CANCELLED = "cancelled"
	EXPIRED = "expired"
	PENDING = "pending"

class Subscription(Base):
	__tablename__ = "subscriptions"

	id = Column(Integer, primary_key = True, index = True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable = False)
	name = Column(String, nullable = False)
	provider = Column(String, nullable = False)
	price = Column(Float, nullable = False)
	currency = Column(String)
	billing_cycle = Column(String)  # monthly, yearly
	status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE)
	start_date = Column(DateTime(timezone=True), server_default=func.now())
	next_billing_date = Column(DateTime(timezone=True))
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	updated_at = Column(DateTime(timezone=True), onupdate=func.now())

	user = relationship("User",  backref = "subscriptions")
