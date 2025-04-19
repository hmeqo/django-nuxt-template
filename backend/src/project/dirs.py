from pathlib import Path

from platformdirs import PlatformDirs

from .settings import UserSettings, app_settings, user_settings
from .utils import get_base_dir, is_writable

dirs = PlatformDirs(app_settings.name)

app_base_dir = get_base_dir()

app_data_dir = app_base_dir / "data"

if user_settings.data_location == UserSettings.DataLocation.GLOBAL:
    app_data_dir = Path(dirs.user_data_dir)
elif user_settings.data_location == UserSettings.DataLocation.AUTO:
    if not is_writable(app_base_dir):
        app_data_dir = Path(dirs.user_data_dir)

app_data_dir.mkdir(exist_ok=True)
