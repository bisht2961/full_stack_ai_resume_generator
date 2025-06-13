from pydantic import BaseModel, Field


class Summary(BaseModel):
    resume_id: int = Field(alias='resumeId')
    summary: str = ""
    id: int = Field(alias='summaryId',default=None)


