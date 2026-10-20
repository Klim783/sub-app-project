from fastapi import APIRouter, HTTPException
import json
from app.aws.common import sqs, SQS_PAYMENT_QUEUE, get_queue_url

router = APIRouter(prefix="/payments-queue", tags=["payments-queue"])

queue_url = None


@router.on_event("startup")
async def startup():
    """Initialize queue URL on startup"""
    global queue_url
    queue_url = get_queue_url(SQS_PAYMENT_QUEUE)


@router.post("/enqueue")
async def enqueue_payment(payment_data: dict):
    """Enqueue a payment for processing"""
    if not queue_url:
        raise HTTPException(status_code=503, detail="Payment queue not available")
    
    try:
        sqs.send_message(
            QueueUrl=queue_url,
            MessageBody=json.dumps(payment_data)
        )
        return {"status": "queued", "payment_id": payment_data.get("payment_id")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to enqueue payment: {str(e)}")


@router.get("/status")
async def get_queue_status():
    """Get approximate number of messages in queue"""
    if not queue_url:
        raise HTTPException(status_code=503, detail="Payment queue not available")
    
    try:
        resp = sqs.get_queue_attributes(
            QueueUrl=queue_url,
            AttributeNames=["ApproximateNumberOfMessages"]
        )
        return {
            "available_messages": int(resp["Attributes"]["ApproximateNumberOfMessages"]),
            "queue_url": queue_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get queue status: {str(e)}")
