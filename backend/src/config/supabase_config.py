from typing import Annotated

from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from jose import jwt, JWTError
from src.config.env_config import SUPABASE_URL, SUPABASE_KEY, TEST_BYPASS_TOKEN
from supabase import create_client, Client

from src.models.user_auth import UserAuth

bearer_scheme = HTTPBearer(auto_error=False)
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        "SUPABASE_URL and SUPABASE_KEY must be set in your environment variables or .env file."
    )
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)\

def get_supabase():
    return supabase


async def verify_jwt_token(token: Annotated[bearer_scheme, Depends(bearer_scheme)]) -> dict:
    """
    Dependency to verify the JWT token and retrieve the current user from Supabase.
    This function will be used to protect your endpoints.
    """
    try:
        if not token or not token.credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        # 🔓 Bypass auth for Swagger testing with a hardcoded or ENV-based token
        if token.credentials == TEST_BYPASS_TOKEN:
            return {"email": "test@example.com"}
        user_response = supabase.auth.get_user(token.credentials)

        if user_response.user:
            return {
                'email': user_response.user.email
            }
        else:
            # If user is None, it means the token is invalid or expired
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        # Catch any exceptions during token verification (e.g., malformed token)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e