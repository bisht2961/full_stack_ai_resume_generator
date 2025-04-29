from pydantic import BaseModel, EmailStr, Field


class PersonalInfo(BaseModel):
    id: int = Field(alias="userId",default=None)
    first_name: str = Field(alias="firstName")
    last_name: str = Field(alias="lastName")
    email: str
    address: str
    email: EmailStr
    phone: str
    job_title: str = Field(alias="jobTitle")
    resume_id: int = Field(alias="resumeId")

    def to_dict(self):
        return self.model_dump(exclude_none=True)