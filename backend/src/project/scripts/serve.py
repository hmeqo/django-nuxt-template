import os
import sys

from granian import cli

from project.dirs import app_base_dir
from project.logging_config import capture_stdout
from project.settings import django_settings, granian_settings


def _serve():
    django_settings.__init__()
    granian_settings.__init__()

    log_dir = app_base_dir / "data" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    if granian_settings.capture_log:
        capture_stdout()

    sys.argv = [
        "granian",
        "backend.wsgi:application",
        "--interface",
        "wsgi",
        "--workers",
        str(granian_settings.workers),
        "--host",
        granian_settings.host,
        "--port",
        str(granian_settings.port),
        "--log-config",
        "conf/logconfig.json",
        "--access-log",
        *sys.argv[1:],
    ]
    sys.exit(cli.entrypoint())


def serve():
    os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
    os.environ["DJANGO_DEBUG"] = "False"

    _serve()


def serve_for_app():
    os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
    os.environ["DJANGO_DEBUG"] = "False"
    os.environ["GRANIAN_CAPTURE_LOG"] = "True"
    os.environ["DB_USE_CACHE"] = "False"
    os.environ["DB_ENGINE"] = "sqlite3"

    _serve()
