from pydantic import BaseModel, Field

class Experience(BaseModel):
    id: int = Field(alias='experienceId',default=None)
    title: str
    company_name: str = Field(alias='companyName')
    start_date: str = Field(alias='startDate')
    end_date: str = Field(alias='endDate')
    city: str
    state: str
    currently_working: str = Field(alias='currentlyWorking')
    work_summary: str = Field(alias='workSummary')

    def to_dict(self):
        return self.model_dump(exclude_none=True)

