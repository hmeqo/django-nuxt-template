import os

from granian.constants import Interfaces, RuntimeModes
from granian.server import Server as Granian

from project.logging_config import capture_stdout, get_logconfig
from project.settings import django_settings, granian_settings


def _serve():
    django_settings.__init__()
    granian_settings.__init__()

    if granian_settings.capture_log:
        capture_stdout()

    server = Granian(
        "backend.wsgi:application",
        address=granian_settings.host,
        port=granian_settings.port,
        interface=Interfaces.WSGI,
        websockets=False,
        backpressure=1,
        workers=granian_settings.workers,
        workers_kill_timeout=3,
        blocking_threads=1,
        blocking_threads_idle_timeout=30,
        runtime_mode=RuntimeModes.st,
        runtime_threads=1,
        runtime_blocking_threads=1,
        log_dictconfig=get_logconfig(),
        log_enabled=True,
        log_access=True,
    )

    server.serve()


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
