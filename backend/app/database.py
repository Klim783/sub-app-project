import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import get_settings

Base = declarative_base()

engine = None
SessionLocal = None

def init_db():
    """Initialize database engine"""
    global engine, SessionLocal
    
    if os.getenv("TESTING") == "true":
        return
    
    if engine is None:
        settings = get_settings()
        # Update the connection string to use psycopg
        if settings.DATABASE_URL.startswith("postgresql://"):
            DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")
        else:
            DATABASE_URL = settings.DATABASE_URL
        
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        
        # Create tables
        from app.models.user import User
        Base.metadata.create_all(bind=engine)

def get_db():
    init_db()
    
    if SessionLocal is None:
        return None
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()