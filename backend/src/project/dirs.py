from pathlib import Path

from platformdirs import PlatformDirs

from .config import UserCfg, app_const, user_cfg
from .utils import get_base_dir, is_writable

dirs = PlatformDirs(app_const.name)

app_base_dir = get_base_dir()

app_data_dir = app_base_dir / "data"

if user_cfg.data_location == UserCfg.DataLocation.GLOBAL:
    app_data_dir = Path(dirs.user_data_dir)
elif user_cfg.data_location == UserCfg.DataLocation.AUTO:
    if not is_writable(app_base_dir):
        app_data_dir = Path(dirs.user_data_dir)

app_data_dir.mkdir(exist_ok=True)
