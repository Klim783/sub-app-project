import os
import sys

# Set testing environment variable BEFORE any imports
os.environ["TESTING"] = "true"

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db


@pytest.fixture
def client():
	# Override the database dependency with a mock
	def override_get_db():
		class MockDB:
			def query(self, model):
				return self

			def offset(self, n):
				return self

			def limit(self, n):
				return self

			def all(self):
				return []

			def first(self):
				return None

			def add(self, item):
				pass

			def commit(self):
				pass

			def refresh(self, item):
				pass

			def delete(self, item):
				pass

		yield MockDB()

	app.dependency_overrides[get_db] = override_get_db

	with TestClient(app) as test_client:
		yield test_client

	app.dependency_overrides.clear()