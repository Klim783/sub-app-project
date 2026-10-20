from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from botocore.exceptions import ClientError
import uuid
from app.aws.common import s3, S3_BUCKET, ensure_bucket_exists

router = APIRouter(prefix="/documents", tags=["documents"])


@router.on_event("startup")
async def startup():
    """Ensure S3 bucket exists on startup"""
    ensure_bucket_exists()


@router.post("/upload")
async def upload_document(file: UploadFile, user_id: int):
    """Upload a document (receipt, invoice, etc.) to S3"""
    key = f"users/{user_id}/documents/{uuid.uuid4().hex[:8]}-{file.filename}"
    
    try:
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=key,
            Body=await file.read(),
            ContentType=file.content_type
        )
        return {"key": key, "filename": file.filename, "status": "uploaded"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.get("/download/{key}")
async def download_document(key: str):
    """Download a document from S3"""
    try:
        obj = s3.get_object(Bucket=S3_BUCKET, Key=key)
        return StreamingResponse(obj["Body"])
    except ClientError:
        raise HTTPException(status_code=404, detail="Document not found")


@router.get("/list/{user_id}")
async def list_user_documents(user_id: int):
    """List all documents for a user"""
    try:
        resp = s3.list_objects_v2(Bucket=S3_BUCKET, Prefix=f"users/{user_id}/documents/")
        return [
            {"key": o["Key"], "size": o["Size"], "last_modified": o["LastModified"]}
            for o in resp.get("Contents", [])
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list documents: {str(e)}")


@router.delete("/{key}")
async def delete_document(key: str):
    """Delete a document from S3"""
    try:
        s3.delete_object(Bucket=S3_BUCKET, Key=key)
        return {"message": "Document deleted successfully"}
    except ClientError:
        raise HTTPException(status_code=404, detail="Document not found")
