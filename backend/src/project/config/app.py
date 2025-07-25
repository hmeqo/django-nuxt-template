from pydantic_settings import BaseSettings, SettingsConfigDict


class AppCfg(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="APP_", extra="ignore")

    debug: bool = True

    host: str = "127.0.0.1"
    port: int = 8000

    workers: int = 2
    capture_log: bool = True

    allowed_origins: list[str] = [
        "http://localhost",
        "https://localhost",
        "http://localhost:3000",
        "https://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3001",
        "tauri://localhost",
        "https://tauri.localhost",
    ]
    extra_allowed_origins: list[str] = []
