import datetime

from fastapi import HTTPException

from src.config.supabase_config import supabase
from src.models.user_auth import UserAuth
from src.utils.utils import validate_password


def register_user(user:UserAuth):
    try:
        errors = validate_password(user.password)
        if len(errors) > 0 :
            raise Exception("password not strong enough")

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
        print(str(ex))
        raise Exception("Failed to Login user")

def get_new_token(refresh_token:str):
    try:
        refreshed = supabase.auth.refresh_session(refresh_token)
        if not refreshed or not refreshed.session:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        return {
            "access_token": refreshed.session.access_token,
            "refresh_token": refreshed.session.refresh_token,
            "email": refreshed.user.email
        }
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=401, detail="Invalid refresh token")