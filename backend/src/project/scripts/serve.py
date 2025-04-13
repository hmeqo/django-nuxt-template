import os
import sys

from granian import cli

from project.env import granian_settings
from project.utils import get_base_dir


def _serve():
    base_dir = get_base_dir()
    (base_dir / "logs").mkdir(exist_ok=True)

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
    os.environ["DJANGO_DEBUG"] = "True"
    os.environ["GRANIAN_CAPTURE_LOG"] = "False"
    os.environ["DB_USE_CACHE"] = "False"
    os.environ["DB_ENGINE"] = "sqlite3"

    _serve()
