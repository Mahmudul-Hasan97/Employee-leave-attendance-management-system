import sys
import os
from fastapi.testclient import TestClient

# backend/app ডিরেক্টরি টেস্ট ফাইলের সাথে কানেক্ট করার জন্য
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_login_invalid_credentials():
    response = client.post("/auth/login", json={"username": "wrong_user", "password": "wrong_password"})
    assert response.status_code == 401