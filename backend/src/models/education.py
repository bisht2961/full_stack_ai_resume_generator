from pydantic import BaseModel,Field

class Education(BaseModel):
    id:int = Field(alias='educationId',default=None)
    university_name: str = Field(alias='universityName')
    start_date: str = Field(alias='startDate')
    end_date: str = Field(alias='endDate')
    degree: str
    major: str
    description: str

    def to_dict(self):
        return self.model_dump(exclude_none=True)

