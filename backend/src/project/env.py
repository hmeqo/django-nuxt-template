import dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

dotenv.load_dotenv()


class DjangoSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="DJANGO_")

    debug: bool = True


class GranianSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="GRANIAN_")

    workers: int = 2
    host: str = "::"
    port: int = 8000


class DBSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="DB_")

    sqlite_file: str = "db.sqlite3"

    engine: str = "mysql"
    name: str = "django-nuxt-template"
    user: str = "django-nuxt-template"
    password: str = ""
    host: str = "127.0.0.1"
    port: int = 3306


django_settings = DjangoSettings()
db_settings = DBSettings()
granian_settings = GranianSettings()
