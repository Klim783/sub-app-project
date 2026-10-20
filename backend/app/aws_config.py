import os
import boto3
from botocore.config import Config

# Floci endpoint configuration
AWS_ENDPOINT_URL = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "test")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "test")
AWS_REGION = os.getenv("AWS_DEFAULT_REGION", "us-east-1")

# S3 Configuration
S3_BUCKET = os.getenv("S3_BUCKET", "subscription-documents")

s3_config = Config(s3={"addressing_style": "path"})
s3_client = boto3.client(
    "s3",
    endpoint_url=AWS_ENDPOINT_URL,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
    config=s3_config
)

# SQS Configuration
SQS_QUEUE = os.getenv("SQS_QUEUE", "subscription-events")
sqs_client = boto3.client(
    "sqs",
    endpoint_url=AWS_ENDPOINT_URL,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# SNS Configuration
SNS_TOPIC = os.getenv("SNS_TOPIC", "subscription-notifications")
sns_client = boto3.client(
    "sns",
    endpoint_url=AWS_ENDPOINT_URL,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# DynamoDB Configuration
DYNAMODB_TABLE = os.getenv("DYNAMODB_TABLE", "subscription-logs")
dynamodb_resource = boto3.resource(
    "dynamodb",
    endpoint_url=AWS_ENDPOINT_URL,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)
dynamodb_table = dynamodb_resource.Table(DYNAMODB_TABLE)
