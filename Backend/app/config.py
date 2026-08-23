from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GEMINI_API_KEY: str
    SESSION_SECRET_KEY: str
    TOKEN_ENCRYPTION_KEY: str
    FRONTEND_URL: str
    GCP_PROJECT_ID: str
    ENVIRONMENT: str = "development"
    BACKEND_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
