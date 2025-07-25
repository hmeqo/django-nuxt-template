import os

from project.scripts._serve import _serve


def serve():
    os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
    os.environ["DEBUG"] = "False"
    os.environ["CAPTURE_LOG"] = "True"
    os.environ["DB_USE_CACHE"] = "False"
    os.environ["DB_ENGINE"] = "sqlite3"

    _serve()


if __name__ == "__main__":
    serve()
