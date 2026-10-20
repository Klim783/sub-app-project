from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

@pytest.mark.skip(reason="Database mocking requires test database setup")
def test_create_user():
	response = client.post(
		"/users/",
		json = {
			"email": "test@example.com",
			"username": "testuser",
			"password": "testpass123"
		}
	)
	assert response.status_code == 200
	data = response.json()
	assert data["email"] == "test@example.com"
	assert data["username"] == "testuser"
	assert "id" in data

@pytest.mark.skip(reason="Database mocking requires test database setup")
def test_get_users():
	response = client.get("/users/")
	assert response.status_code == 200
	assert isinstance(response.json(), list)
