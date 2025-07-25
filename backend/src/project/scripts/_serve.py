import sys

from granian import cli

from project.config import app_cfg, db_cfg
from project.dirs import app_base_dir
from project.recipes.capture_stdout import capture_stdout


def _serve():
    app_cfg.__init__()
    db_cfg.__init__()

    log_dir = app_base_dir / "data" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    if app_cfg.capture_log:
        capture_stdout("_granian")

    sys.argv = [
        "granian",
        "backend.wsgi:application",
        "--interface",
        "wsgi",
        "--workers",
        str(app_cfg.workers),
        "--host",
        app_cfg.host,
        "--port",
        str(app_cfg.port),
        "--log-config",
        "conf/logconfig.json",
        "--access-log",
    ]
    sys.exit(cli.entrypoint())
