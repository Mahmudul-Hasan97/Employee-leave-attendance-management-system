import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import models
from app.database import Base, get_db
from app.main import app
from app.utils import get_password_hash


@pytest.fixture
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    test_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    with test_session() as db:
        db.add_all(
            [
                models.User(
                    name="System Admin",
                    email="admin@example.com",
                    password=get_password_hash("admin-pass123"),
                    role="admin",
                ),
                models.User(
                    name="Test Employee",
                    email="employee@example.com",
                    password=get_password_hash("employee-pass123"),
                    role="employee",
                ),
            ]
        )
        db.commit()

    def override_get_db():
        with test_session() as db:
            yield db

    app.dependency_overrides[get_db] = override_get_db
    test_client = TestClient(app)
    yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post(
        "/auth/login",
        json={"email": email, "password": password},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_health_endpoint(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_invalid_login_is_rejected(client: TestClient):
    response = client.post(
        "/auth/login",
        json={"username": "wrong_user", "password": "wrong_password"},
    )
    assert response.status_code == 401


def test_protected_employee_endpoint_requires_admin(client: TestClient):
    assert client.get("/employees").status_code == 401

    token = _login(client, "employee@example.com", "employee-pass123")
    response = client.get(
        "/employees",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 403


def test_employee_can_only_create_own_attendance(client: TestClient):
    token = _login(client, "employee@example.com", "employee-pass123")
    response = client.post(
        "/attendance",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "user_id": 1,
            "date": "2026-11-20",
            "clock_in": "09:00",
        },
    )
    assert response.status_code == 201
    assert response.json()["user_id"] == 2
    assert response.json()["user_name"] == "Test Employee"

    duplicate = client.post(
        "/attendance",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "user_id": 2,
            "date": "2026-11-20",
            "clock_in": "09:10",
        },
    )
    assert duplicate.status_code == 409

    employee_update = client.put(
        f"/attendance/{response.json()['id']}",
        headers={"Authorization": f"Bearer {token}"},
        json={"status": "Approved"},
    )
    assert employee_update.status_code == 403

    admin_token = _login(client, "admin@example.com", "admin-pass123")
    admin_update = client.put(
        f"/attendance/{response.json()['id']}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"status": "Approved"},
    )
    assert admin_update.status_code == 200
    assert admin_update.json()["status"] == "Approved"


def test_leave_request_uses_authenticated_employee_and_validates_dates(
    client: TestClient,
):
    token = _login(client, "employee@example.com", "employee-pass123")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post(
        "/leaves",
        headers=headers,
        json={
            "user_id": 1,
            "start_date": "2026-12-01",
            "end_date": "2026-12-03",
            "reason": "Family event",
        },
    )
    assert response.status_code == 201
    assert response.json()["user_id"] == 2
    assert response.json()["user_name"] == "Test Employee"
    assert [item["id"] for item in client.get("/leaves", headers=headers).json()] == [
        response.json()["id"]
    ]

    invalid_range = client.post(
        "/leaves",
        headers=headers,
        json={
            "user_id": 2,
            "start_date": "2026-12-03",
            "end_date": "2026-12-01",
            "reason": "Invalid range",
        },
    )
    assert invalid_range.status_code == 422


def test_employee_can_update_own_profile(client: TestClient):
    token = _login(client, "employee@example.com", "employee-pass123")
    response = client.put(
        "/employees/2",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": "Updated Employee"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Employee"
    assert "password" not in response.json()


def test_admin_can_create_employee_with_hashed_password(client: TestClient):
    token = _login(client, "admin@example.com", "admin-pass123")
    response = client.post(
        "/employees",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "New Employee",
            "email": "new@example.com",
            "password": "new-pass123",
            "role": "employee",
        },
    )
    assert response.status_code == 201
    assert "password" not in response.json()

    assert _login(client, "new@example.com", "new-pass123")
