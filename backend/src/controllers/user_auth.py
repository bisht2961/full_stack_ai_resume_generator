from fastapi import APIRouter,HTTPException, status
from starlette.responses import JSONResponse
from src.services.user_auth_service import register_user, login_user
from src.models.user_auth import UserAuth

user_auth_router = APIRouter(
    prefix='/auth',
    tags=["User Authentication API"]
)

@user_auth_router.post("/register")
def register(user:UserAuth):
    try:
        return JSONResponse(register_user(user))
    except Exception as e:
        error_detail = str(e)
        if "user already registered" in error_detail.lower():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this email already exists."
            )
        print(f"Registration error: {error_detail}")  # Log for debugging
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {error_detail}"
        )

@user_auth_router.post("/login")
def login(user:UserAuth):
    try:
        return JSONResponse(login_user(user))
    except Exception as e:
        error_detail = str(e)
        if "Invalid login credentials" in error_detail or "AuthApiError: Invalid login credentials" in error_detail:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )
        print(f"Login error: {error_detail}")  # Log for debugging
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Login failed: {error_detail}"
        )