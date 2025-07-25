from enum import StrEnum

from pydantic_settings import BaseSettings, SettingsConfigDict


class UserCfg(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="APP_", extra="ignore")

    class DataLocation(StrEnum):
        LOCAL = "local"
        GLOBAL = "global"
        AUTO = "auto"

    data_location: DataLocation = DataLocation.AUTO
