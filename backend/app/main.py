from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.users import router as users_router
from app.api.subscriptions import router as subscriptions_router
from app.api.payments import router as payments_router


settings = get_settings()

app = FastAPI(
    title="Subscription Manager API",
    description="API for managing subscriptions with ML features",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(subscriptions_router)
app.include_router(payments_router)



@app.get("/")
async def root():
    return {"message": "Subscription Manager API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}