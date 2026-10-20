from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

@pytest.mark.skip(reason="Database mocking requires test database setup")
def test_create_subscription():
    response = client.post(
        "/subscriptions/",
        json={
            "user_id": 1,
            "provider": "Netflix",
            "plan": "Premium",
            "price": 19.99,
            "currency": "USD",
            "billing_cycle": "monthly"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["provider"] == "Netflix"
    assert data["price"] == 19.99

@pytest.mark.skip(reason="Database mocking requires test database setup")
def test_get_subscriptions():
    response = client.get("/subscriptions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)