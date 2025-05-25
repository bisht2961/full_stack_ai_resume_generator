from pydantic import BaseModel,Field

class Project(BaseModel):
    id: int =  Field(alias='projectId',default=None)
    resume_id: int = Field(alias='resumeId')
    title: str
    description : str
    link: str = Field(default=None)

    def to_dict(self):
        return self.model_dump(exclude_none=True)