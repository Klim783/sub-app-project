from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.users import router as users_router
from app.api.auth import router as auth_router
# from app.api.subscriptions import router as subscriptions_router
# from app.api.payments import router as payments_router
# from app.api.documents import router as documents_router
# from app.api.payments_sqs import router as payments_sqs_router
# from app.api.notifications import router as notifications_router
# from app.api.ml import router as ml_router


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

app.include_router(auth_router)
app.include_router(users_router)
# app.include_router(subscriptions_router)
# app.include_router(payments_router)
# app.include_router(documents_router)
# app.include_router(payments_sqs_router)
# app.include_router(notifications_router)
# app.include_router(ml_router)



@app.get("/")
async def root():
    return {"message": "Subscription Manager API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}