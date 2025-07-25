import os

from project.scripts._serve import _serve


def serve():
    os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
    os.environ["DEBUG"] = "False"

    _serve()


if __name__ == "__main__":
    serve()
