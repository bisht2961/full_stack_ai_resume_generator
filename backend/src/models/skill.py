from pydantic import BaseModel, Field

class SkillBase(BaseModel):
    id: int = Field(alias='skillId',default=None)
    name: str
    rating: int
    resume_id: int = Field(alias='resumeId')


