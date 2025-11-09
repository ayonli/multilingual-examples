from typing import Literal

from pydantic import BaseModel


class User(BaseModel):
    email: str
    name: str
    gender: Literal[0] | Literal[1]
    age: int
    birthday: str
    country: str
    province: str
    city: str
    detailed_address: str


class Author(User):
    biography: str
    publisher: str
