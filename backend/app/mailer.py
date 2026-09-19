"""Synchronous SMTP delivery called in FastAPI's thread pool."""
from email.message import EmailMessage
import smtplib
import ssl
from .config import Settings
from .models import ContactRequest

class MailUnavailable(RuntimeError):
    pass

def send_contact(data: ContactRequest, settings: Settings) -> None:
    if not all((settings.smtp_host, settings.smtp_from, settings.contact_to)):
        raise MailUnavailable("SMTP is not configured")
    message = EmailMessage()
    message["Subject"] = "Webbforfragan - ED Frisör"
    message["From"] = settings.smtp_from
    message["To"] = settings.contact_to
    message["Reply-To"] = str(data.email)
    message.set_content(
        f"Namn: {data.name}\nE-post: {data.email}\nTelefon: {data.phone}\n"
        f"Tjanst: {data.service}\n\n{data.message}\n"
    )
    context = ssl.create_default_context()
    try:
        if settings.smtp_ssl:
            client = smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=12, context=context)
        else:
            client = smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=12)
        with client:
            if not settings.smtp_ssl:
                client.ehlo()
                client.starttls(context=context)
                client.ehlo()
            if settings.smtp_username:
                client.login(settings.smtp_username, settings.smtp_password)
            refused = client.send_message(message)
            if refused:
                raise MailUnavailable("Recipient refused")
    except (smtplib.SMTPException, OSError, ValueError) as exc:
        # Do not expose SMTP credentials or email content in the HTTP response.
        raise MailUnavailable("SMTP delivery failed") from exc
