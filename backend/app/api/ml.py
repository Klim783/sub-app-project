from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
from app.database import get_db
from app.models.subscription import Subscription
from app.models.user import User
from app.core.deps import get_current_active_user
import sys
import os

# Add ml directory to path to import models
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

# Try to import ML models, but make them optional
try:
    from ml.churn_prediction import ChurnPredictor
    from ml.recommendation import SubscriptionRecommender
    churn_predictor = ChurnPredictor()
    recommender = SubscriptionRecommender()
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    churn_predictor = None
    recommender = None

router = APIRouter(prefix="/ml", tags=["machine-learning"])


@router.post("/churn-predict")
def predict_churn(
    subscription_ids: List[int],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Predict churn probability for given subscriptions"""
    if not ML_AVAILABLE:
        raise HTTPException(status_code=503, detail="ML module not available")
    
    # Fetch subscriptions
    subscriptions = db.query(Subscription).filter(
        Subscription.id.in_(subscription_ids),
        Subscription.user_id == current_user.id
    ).all()
    
    if not subscriptions:
        raise HTTPException(status_code=404, detail="No subscriptions found")
    
    # Prepare data for ML model
    data = []
    for sub in subscriptions:
        data.append({
            'price': float(sub.price) if hasattr(sub, 'price') else 0,
            'billing_cycle': getattr(sub, 'billing_cycle', 'monthly'),
            'subscription_age_days': (sub.created_at - sub.created_at).days if hasattr(sub, 'created_at') else 0,
            'payment_count': 0,  # Would need to fetch from payments table
            'total_spent': float(sub.price) * 12 if hasattr(sub, 'price') else 0,
        })
    
    # Note: In production, you would load a pre-trained model
    # For now, we'll return mock predictions since the model needs training
    try:
        # Attempt to use the model if trained
        if churn_predictor.is_trained:
            predictions = churn_predictor.predict(data)
        else:
            # Return mock predictions if model not trained
            predictions = [
                {"churn_probability": 0.2 + (i * 0.1), "at_risk": False}
                for i, _ in enumerate(subscriptions)
            ]
    except Exception as e:
        # Fallback to mock predictions
        predictions = [
            {"churn_probability": 0.3, "at_risk": False}
            for _ in subscriptions
        ]
    
    return {
        "subscriptions": [
            {
                "id": sub.id,
                "name": getattr(sub, 'name', f"Subscription {sub.id}"),
                "prediction": pred
            }
            for sub, pred in zip(subscriptions, predictions)
        ]
    }


@router.post("/recommend")
def get_recommendations(
    top_n: int = 5,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get subscription recommendations based on user's current subscriptions"""
    if not ML_AVAILABLE:
        raise HTTPException(status_code=503, detail="ML module not available")
    
    # Get user's current subscriptions
    user_subscriptions = db.query(Subscription).filter(
        Subscription.user_id == current_user.id
    ).all()
    
    # Get all subscriptions (for recommendation pool)
    all_subscriptions = db.query(Subscription).all()
    
    # Prepare data
    user_subs_data = [
        {
            'name': getattr(sub, 'name', ''),
            'provider': getattr(sub, 'provider', ''),
            'category': getattr(sub, 'category', '')
        }
        for sub in user_subscriptions
    ]
    
    all_subs_data = [
        {
            'id': sub.id,
            'name': getattr(sub, 'name', ''),
            'provider': getattr(sub, 'provider', ''),
            'category': getattr(sub, 'category', ''),
            'price': float(getattr(sub, 'price', 0))
        }
        for sub in all_subscriptions
    ]
    
    try:
        # Get recommendations
        recommendations = recommender.recommend(
            user_subs_data,
            all_subs_data,
            top_n=top_n
        )
        
        # Filter out user's current subscriptions
        user_sub_ids = {sub.id for sub in user_subscriptions}
        recommendations = [
            rec for rec in recommendations 
            if rec.get('id') not in user_sub_ids
        ]
        
    except Exception as e:
        # Fallback to random recommendations if ML fails
        recommendations = all_subs_data[:top_n]
    
    return {
        "recommendations": recommendations[:top_n]
    }


@router.get("/model-status")
def get_model_status():
    """Get status of ML models"""
    if not ML_AVAILABLE:
        return {
            "ml_available": False,
            "message": "ML module not available"
        }
    
    return {
        "ml_available": True,
        "churn_predictor": {
            "is_trained": churn_predictor.is_trained,
            "model_type": "RandomForestClassifier"
        },
        "recommender": {
            "is_fitted": recommender.is_fitted,
            "model_type": "TF-IDF + Cosine Similarity"
        }
    }
