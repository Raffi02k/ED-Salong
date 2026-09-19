"""Environment-only settings. No production credentials are included."""
from dataclasses import dataclass
from pathlib import Path
import os
from dotenv import load_dotenv

@dataclass(frozen=True)
class Settings:
    contact_mode: str = "demo"
    allowed_origins: tuple[str, ...] = ("http://localhost:5173", "http://127.0.0.1:5173")
    allowed_hosts: tuple[str, ...] = ("localhost", "127.0.0.1", "testserver")
    rate_limit_requests: int = 5
    rate_limit_seconds: int = 600
    max_body_bytes: int = 16384
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from: str = ""
    contact_to: str = ""
    smtp_ssl: bool = False

    @classmethod
    def from_env(cls) -> "Settings":
        load_dotenv(Path(__file__).resolve().parents[1] / ".env")
        def csv(name: str, default: str) -> tuple[str, ...]:
            return tuple(x.strip() for x in os.getenv(name, default).split(",") if x.strip())
        mode = os.getenv("CONTACT_MODE", "demo").lower()
        if mode not in {"demo", "smtp"}:
            raise ValueError("CONTACT_MODE must be demo or smtp")
        origins = csv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
        hosts = csv("ALLOWED_HOSTS", "localhost,127.0.0.1,testserver")
        if not origins or "*" in origins or not hosts or "*" in hosts:
            raise ValueError("Explicit allowed origins and hosts are required")
        return cls(
            contact_mode=mode, allowed_origins=origins, allowed_hosts=hosts,
            rate_limit_requests=max(1, int(os.getenv("RATE_LIMIT_REQUESTS", "5"))),
            rate_limit_seconds=max(1, int(os.getenv("RATE_LIMIT_SECONDS", "600"))),
            max_body_bytes=max(1024, int(os.getenv("MAX_BODY_BYTES", "16384"))),
            smtp_host=os.getenv("SMTP_HOST", ""), smtp_port=int(os.getenv("SMTP_PORT", "587")),
            smtp_username=os.getenv("SMTP_USERNAME", ""), smtp_password=os.getenv("SMTP_PASSWORD", ""),
            smtp_from=os.getenv("SMTP_FROM", ""), contact_to=os.getenv("CONTACT_TO", ""),
            smtp_ssl=os.getenv("SMTP_SSL", "false").lower() == "true",
        )
