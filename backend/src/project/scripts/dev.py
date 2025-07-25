import os
import sys

import django

from project.config import app_cfg

os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
django.setup()


def dev():
    from django.core.management import call_command

    host = f"[{app_cfg.host}]" if ":" in app_cfg.host and "[" not in app_cfg.host else app_cfg.host
    call_command("runserver", f"{host}:{app_cfg.port}", *sys.argv[1:])


if __name__ == "__main__":
    dev()
