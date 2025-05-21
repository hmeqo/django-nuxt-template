from dataclasses import dataclass
from enum import StrEnum

from pydantic_settings import BaseSettings, SettingsConfigDict


@dataclass
class AppSettings:
    name: str = "django-nuxt-template"


class UserSettings(BaseSettings):
    class DataLocation(StrEnum):
        LOCAL = "local"
        GLOBAL = "global"
        AUTO = "auto"

    data_location: DataLocation = DataLocation.AUTO

    model_config = SettingsConfigDict(env_file=".env", env_prefix="app_", extra="ignore")


class DjangoSettings(BaseSettings):
    debug: bool = True

    host: str = "127.0.0.1"
    port: int = 8000

    model_config = SettingsConfigDict(env_file=".env", env_prefix="django_", extra="ignore")


class ProdSettings(BaseSettings):
    workers: int = 2
    host: str = "::"
    port: int = 8000

    capture_log: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_prefix="prod_", extra="ignore")


class DBSettings(BaseSettings):
    sqlite_file: str = "db.sqlite3"

    engine: str = "sqlite3"
    name: str = "django-nuxt-template"
    user: str = "django-nuxt-template"
    password: str = ""
    host: str = "127.0.0.1"
    port: int | None = None

    use_cache: bool = False

    model_config = SettingsConfigDict(env_file=".env", env_prefix="db_", extra="ignore")


app_settings = AppSettings()
user_settings = UserSettings()
django_settings = DjangoSettings()
db_settings = DBSettings()
prod_settings = ProdSettings()
