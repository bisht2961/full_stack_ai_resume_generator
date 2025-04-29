from pydantic import BaseModel, Field


class ResumeBase(BaseModel):
    id: int = Field(alias='resumeId',default=None)
    user_email: str = Field(alias='userEmail')
    theme_color: str = Field(alias='themeColor',default="#ffffff")
    title: str

    def to_dict(self):
        return self.model_dump(exclude_none=True)

