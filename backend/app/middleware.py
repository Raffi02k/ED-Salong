"""Bound request bodies before parsing; never buffer an unlimited upload."""
from starlette.responses import JSONResponse
from starlette.types import ASGIApp, Receive, Scope, Send

class BodyLimitMiddleware:
    def __init__(self, app: ASGIApp, maximum: int = 16384) -> None:
        self.app, self.maximum = app, maximum

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http" or scope["method"] not in {"POST", "PUT", "PATCH"}:
            await self.app(scope, receive, send)
            return
        chunks: list[bytes] = []
        size = 0
        while True:
            event = await receive()
            if event["type"] == "http.disconnect":
                return
            data = event.get("body", b"")
            size += len(data)
            if size > self.maximum:
                response = JSONResponse({"detail": "Meddelandet ar for stort."}, status_code=413)
                await response(scope, receive, send)
                return
            chunks.append(data)
            if not event.get("more_body", False):
                break
        body = b"".join(chunks)
        consumed = False
        async def replay() -> dict:
            nonlocal consumed
            if not consumed:
                consumed = True
                return {"type": "http.request", "body": body, "more_body": False}
            return await receive()
        await self.app(scope, replay, send)
