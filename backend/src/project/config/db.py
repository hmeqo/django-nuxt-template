from pydantic_settings import BaseSettings, SettingsConfigDict


class DBCfg(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="DB_", extra="ignore")

    sqlite_file: str = "db.sqlite3"

    engine: str = "sqlite3"
    name: str = "django-nuxt-template"
    user: str = "django-nuxt-template"
    password: str = ""
    host: str = "127.0.0.1"
    port: int | None = None

    use_cache: bool = False
