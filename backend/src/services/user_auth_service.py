import datetime

from src.config.supabase_config import supabase
from src.models.user_auth import UserAuth


def register_user(user:UserAuth):
    try:
        supabase.auth.sign_up({
        "email": user.email,
        "password": user.password,
        "date":{
            "confirmation_sent_at": datetime.datetime.now()
        }
        })
        return {"message": "User registered. Please verify your email."}
    except Exception as ex:
        print(ex)
        raise Exception("Failed to register user")

def login_user(user:UserAuth):
    try:
        result = supabase.auth.sign_in_with_password({
        "email": user.email,
        "password": user.password
        })
        # print(result.user)
        return {
            "access_token": result.session.access_token,
            "refresh_token": result.session.refresh_token,
            "email": user.email
        }
    except Exception as ex:
        print(ex)
        raise Exception("Failed to Login user")