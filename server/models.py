from pydantic import BaseModel, Field, field_validator
import re


class GuestCreate(BaseModel):
    full_name: str = Field(..., min_length=1, description="Guest's full name")
    phone_number: str = Field(...,
                              description="Guest's phone number (10 or 11 digits)")

    @field_validator('full_name')
    def name_must_have_two_words(cls, v):
        if len(v.strip().split()) < 2:
            raise ValueError('must be your first and last name')
        return v.strip()

    @field_validator('phone_number')
    def phone_number_must_be_valid(cls, v):
        cleaned_num = re.sub(r'\D', '', v)
        if not (10 <= len(cleaned_num) <= 11 and cleaned_num.isdigit()):
            raise ValueError('numbers only (ex. 1231231234)')
        return cleaned_num


class GuestResponse(BaseModel):
    id: int
    full_name: str
    phone_number: str

    class Config:
        from_attributes = True
