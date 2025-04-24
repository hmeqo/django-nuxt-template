from dataclasses import dataclass
from enum import StrEnum

import dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

dotenv.load_dotenv()


@dataclass
class AppSettings:
    name: str = "django-nuxt-template"


class UserSettings(BaseSettings):
    model_config = SettingsConfigDict()

    class DataLocation(StrEnum):
        LOCAL = "local"
        GLOBAL = "global"
        AUTO = "auto"

    data_location: DataLocation = DataLocation.AUTO


class DjangoSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="DJANGO_")

    debug: bool = True

    host: str = "127.0.0.1"
    port: int = 8000


class GranianSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="GRANIAN_")

    workers: int = 2
    host: str = "::"
    port: int = 8000

    capture_log: bool = True


class DBSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="DB_")

    sqlite_file: str = "db.sqlite3"

    engine: str = "sqlite3"
    name: str = "django-nuxt-template"
    user: str = "django-nuxt-template"
    password: str = ""
    host: str = "127.0.0.1"
    port: int = 3306

    use_cache: bool = False


app_settings = AppSettings()
user_settings = UserSettings()
django_settings = DjangoSettings()
db_settings = DBSettings()
granian_settings = GranianSettings()
