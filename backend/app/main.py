"""ED Frisör API. Run: uvicorn app.main:app --reload"""
from collections import deque
from pathlib import Path
from threading import Lock
import json
import time
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from .config import Settings
from .mailer import MailUnavailable, send_contact
from .middleware import BodyLimitMiddleware
from .models import ContactRequest, ContactResponse, Review

class RateLimiter:
    # Per-process protection for a small deployment, not a distributed limit.
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.entries: dict[str, deque[float]] = {}
        self.lock = Lock()

    def check(self, key: str) -> None:
        now = time.monotonic()
        cutoff = now - self.settings.rate_limit_seconds
        with self.lock:
            for address in list(self.entries):
                queue = self.entries[address]
                while queue and queue[0] <= cutoff:
                    queue.popleft()
                if not queue:
                    del self.entries[address]
            if len(self.entries) >= 10000 and key not in self.entries:
                raise HTTPException(429, "Forsok igen senare.", headers={"Retry-After": "60"})
            queue = self.entries.setdefault(key, deque())
            if len(queue) >= self.settings.rate_limit_requests:
                retry = max(1, int(queue[0] + self.settings.rate_limit_seconds - now) + 1)
                raise HTTPException(429, "For manga forsok. Forsok igen senare.", headers={"Retry-After": str(retry)})
            queue.append(now)

def create_app(settings: Settings | None = None) -> FastAPI:
    config = settings or Settings.from_env()
    app = FastAPI(title="ED Frisör API", version="1.0.0", docs_url="/api/docs", redoc_url=None, openapi_url="/api/openapi.json")
    app.state.settings = config
    app.state.limiter = RateLimiter(config)
    app.state.sender = send_contact
    app.add_middleware(BodyLimitMiddleware, maximum=config.max_body_bytes)
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=list(config.allowed_hosts))
    app.add_middleware(CORSMiddleware, allow_origins=list(config.allowed_origins), allow_credentials=False,
                       allow_methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type"])

    @app.get("/api/health")
    def health(response: Response) -> dict[str, str]:
        response.headers["Cache-Control"] = "no-store"
        return {"status": "ok", "contact_mode": config.contact_mode}

    @app.get("/api/reviews", response_model=list[Review])
    def reviews(response: Response) -> list[Review]:
        response.headers["Cache-Control"] = "no-store"
        source = Path(__file__).resolve().parents[1] / "data" / "reviews.json"
        try:
            data = json.loads(source.read_text(encoding="utf-8")) if source.exists() else []
            if not isinstance(data, list):
                raise ValueError("Reviews must be an array")
            return [Review.model_validate(item) for item in data[:100]]
        except (OSError, ValueError):
            raise HTTPException(503, "Omdomen ar tillfalligt otillgangliga.")

    @app.post("/api/contact", response_model=ContactResponse)
    def contact(payload: ContactRequest, request: Request, response: Response) -> ContactResponse:
        # Use the transport peer. Never trust a caller-supplied X-Forwarded-For here.
        client = request.client.host if request.client else "unknown"
        app.state.limiter.check(client)
        response.headers["Cache-Control"] = "no-store"
        if payload.website:
            raise HTTPException(400, "Formularet kunde inte skickas.")
        if config.contact_mode == "demo":
            return ContactResponse(status="demo", delivered=False,
                                   message="Testlage: formularet fungerar, men inget mejl skickades.")
        try:
            app.state.sender(payload, config)
        except MailUnavailable:
            raise HTTPException(503, "Meddelandet kunde inte skickas. Forsok igen eller kontakta salongen via bokningen.")
        return ContactResponse(status="sent", delivered=True, message="Tack! Ditt meddelande har skickats till salongen.")
    return app

app = create_app()
