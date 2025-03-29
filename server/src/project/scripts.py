import os
import sys
from pathlib import Path

from .env import granian_settings

BASE_DIR = Path(__file__).resolve().parent.parent.parent


def dev():
    os.execvp("python", ["python", "manage.py", "runserver", *sys.argv[1:]])


def serve():
    (BASE_DIR / "logs").mkdir(exist_ok=True)

    os.environ["DJANGO_DEBUG"] = "False"
    os.execvp(
        "granian",
        [
            "granian",
            "jhsk.wsgi:application",
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
        ],
    )
