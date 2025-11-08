from pydantic.main import BaseModel


class Post(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    published: bool = False
