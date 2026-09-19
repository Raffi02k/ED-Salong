from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    service: str = Field(default="", max_length=120)
    message: str = Field(min_length=10, max_length=4000)
    consent: Literal[True]
    website: str = Field(default="", max_length=200)

    @field_validator("name", "phone", "service")
    @classmethod
    def reject_control_characters(cls, value: str) -> str:
        if any(ord(c) < 32 or ord(c) == 127 for c in value):
            raise ValueError("Control characters are not allowed")
        return value

class ContactResponse(BaseModel):
    status: Literal["demo", "sent"]
    delivered: bool
    message: str

class Review(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str = Field(min_length=1, max_length=100)
    name: str = Field(min_length=1, max_length=100)
    text: str = Field(min_length=1, max_length=1500)
    source: str = Field(min_length=1, max_length=100)
    url: str = Field(pattern=r"^https://", max_length=2000)
    excerpt: bool = False
    demo: bool = False
