from pydantic import BaseModel,Field

class Achievement(BaseModel):
    id:int = Field(alias='achievementId',default=None)
    title: str
    description: str
    link:str = Field(default=None)

    def to_dict(self):
        return self.model_dump(exclude_none=True)

