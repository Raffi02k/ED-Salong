from dataclasses import replace
from fastapi.testclient import TestClient
from app.config import Settings
from app.main import create_app
from app.mailer import MailUnavailable

VALID = {"name": "Test Person", "email": "test@example.com", "phone": "0701234567", "service": "Harklippning", "message": "Detta ar ett testmeddelande.", "consent": True, "website": ""}

def client(settings=None):
    return TestClient(create_app(settings or Settings()))

def test_health():
    assert client().get("/api/health").json() == {"status": "ok", "contact_mode": "demo"}

def test_demo_never_claims_delivery():
    r = client().post("/api/contact", json=VALID)
    assert r.status_code == 200
    assert r.json()["status"] == "demo" and r.json()["delivered"] is False

def test_smtp_success_uses_sender():
    app = create_app(replace(Settings(), contact_mode="smtp"))
    received = []
    app.state.sender = lambda data, settings: received.append(data)
    r = TestClient(app).post("/api/contact", json=VALID)
    assert r.status_code == 200 and r.json()["delivered"] is True
    assert received[0].name == VALID["name"]

def test_unconfigured_smtp_is_error():
    r = client(replace(Settings(), contact_mode="smtp")).post("/api/contact", json=VALID)
    assert r.status_code == 503

def test_sender_failure_is_error():
    app = create_app(replace(Settings(), contact_mode="smtp"))
    def fail(*args):
        raise MailUnavailable("Failure")
    app.state.sender = fail
    assert TestClient(app).post("/api/contact", json=VALID).status_code == 503

def test_requires_consent():
    assert client().post("/api/contact", json={**VALID, "consent": False}).status_code == 422

def test_validates_email():
    assert client().post("/api/contact", json={**VALID, "email": "wrong"}).status_code == 422

def test_rejects_extra_fields():
    assert client().post("/api/contact", json={**VALID, "admin": True}).status_code == 422

def test_honeypot():
    assert client().post("/api/contact", json={**VALID, "website": "spam.example"}).status_code == 400

def test_no_header_injection():
    assert client().post("/api/contact", json={**VALID, "name": "Name\r\nBcc: x@example.com"}).status_code == 422

def test_rate_limit():
    c = client(replace(Settings(), rate_limit_requests=2))
    assert c.post("/api/contact", json=VALID).status_code == 200
    assert c.post("/api/contact", json=VALID).status_code == 200
    r = c.post("/api/contact", json=VALID)
    assert r.status_code == 429 and "retry-after" in r.headers

def test_limited_body():
    assert client().post("/api/contact", content=b"x" * 17000, headers={"content-type": "application/json"}).status_code == 413

def test_empty_reviews_are_not_fabricated():
    assert client().get("/api/reviews").json() == []

def test_cors():
    c = client()
    assert c.options("/api/contact", headers={"origin": "http://localhost:5173", "access-control-request-method": "POST"}).status_code == 200
    r = c.options("/api/contact", headers={"origin": "https://evil.example", "access-control-request-method": "POST"})
    assert "access-control-allow-origin" not in r.headers

def test_unknown_host():
    assert client().get("/api/health", headers={"host": "untrusted.example"}).status_code == 400
