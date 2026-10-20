import os
import time
import boto3
from botocore.config import Config

# Floci endpoint configuration
ENDPOINT = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID", "test")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "test")
AWS_REGION = os.getenv("AWS_DEFAULT_REGION", "us-east-1")

# AWS resource names
S3_BUCKET = "subscription-documents"
SQS_PAYMENT_QUEUE = "payment-processing"
SQS_NOTIFICATION_QUEUE = "subscription-notifications"
SNS_RENEWAL_TOPIC = "subscription-renewals"
DYNAMODB_SUBSCRIPTIONS_TABLE = "subscriptions"

# S3 client for document storage
s3 = boto3.client(
    "s3",
    endpoint_url=ENDPOINT,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION,
    config=Config(s3={"addressing_style": "path"})
)

# SQS client for payment processing
sqs = boto3.client(
    "sqs",
    endpoint_url=ENDPOINT,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

# SNS client for notifications
sns = boto3.client(
    "sns",
    endpoint_url=ENDPOINT,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

# DynamoDB resource for subscription data
dynamodb = boto3.resource(
    "dynamodb",
    endpoint_url=ENDPOINT,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)
subscriptions_table = dynamodb.Table(DYNAMODB_SUBSCRIPTIONS_TABLE)


def get_queue_url(queue_name: str, retries: int = 30) -> str:
    """Get SQS queue URL with retry logic"""
    for _ in range(retries):
        try:
            return sqs.get_queue_url(QueueName=queue_name)["QueueUrl"]
        except Exception as e:
            print(f"Waiting for queue {queue_name}: {e}")
            time.sleep(1)
    raise RuntimeError(f"Queue {queue_name} not found. Did Terraform apply run?")


def get_topic_arn(topic_name: str, retries: int = 30) -> str:
    """Get SNS topic ARN with retry logic"""
    for _ in range(retries):
        try:
            for t in sns.list_topics()["Topics"]:
                if t["TopicArn"].endswith(f":{topic_name}"):
                    return t["TopicArn"]
        except Exception as e:
            print(f"Waiting for topic {topic_name}: {e}")
            time.sleep(1)
    raise RuntimeError(f"SNS topic {topic_name} not found. Did Terraform apply run?")


def ensure_bucket_exists(bucket_name: str = S3_BUCKET) -> None:
    """Ensure S3 bucket exists, create if not"""
    try:
        s3.head_bucket(Bucket=bucket_name)
    except Exception:
        try:
            s3.create_bucket(Bucket=bucket_name)
            print(f"Created bucket: {bucket_name}")
        except Exception as e:
            print(f"Failed to create bucket {bucket_name}: {e}")
