import re
from src.models.personal_info import PersonalInfo

def valid_phone_number(phone):
    pattern = re.compile("(0|91)?[6-9][0-9]{9}")
    if len(phone) == 0 or not pattern.match(phone):
        raise ValueError('Invalid Phone Number')
    return phone

def valid_name(name):
    pattern = re.compile('[A-Za-z]{2,25}||\s[A-Za-z]{2,25}')
    if len(name) == 0 or not pattern.match(name):
        raise ValueError('Invalid Name')
    return name
def valid_email(email):
    if len(email) == 0 or not re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b',email):
        raise ValueError('Invalid Email')
    return email


def check_user_details(user:PersonalInfo):
    valid_phone_number(user.phone)
    valid_name(user.first_name)
    valid_name(user.last_name)
    valid_email(user.email)

def validate_password(password: str) -> list[str]:
    errors = []

    if len(password) < 8:
        errors.append("Password must be at least 8 characters long.")
    if len(password) > 32:
        errors.append("Password must be at most 32 characters long.")
    if not re.search(r"[A-Z]", password):
        errors.append("Password must contain at least one uppercase letter.")
    if not re.search(r"[a-z]", password):
        errors.append("Password must contain at least one lowercase letter.")
    if not re.search(r"[0-9]", password):
        errors.append("Password must contain at least one digit.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        errors.append("Password must contain at least one special character.")
    if re.search(r"\s", password):
        errors.append("Password must not contain spaces.")

    return errors