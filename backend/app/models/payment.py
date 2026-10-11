from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Payment(Base):
	__tablename__ = "payments"

	id = Column(Integer, primary_key=True, index = True)
	subscription_id = Column(Integer, ForeignKey("subscriptions.id"), nullable=False)
	amount = Column(Float, nullable = False)
	currency = Column(String, default = "USD")
	status = Column(String, default = "completed")
	payment_date = Column(DateTime(timezone = True), server_default=func.now())

	subscription = relationship("Subscription", backref = "payments")
