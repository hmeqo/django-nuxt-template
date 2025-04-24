import os
import sys

import django

from project.settings import django_settings

os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
django.setup()


def dev():
    from django.core.management import call_command

    call_command("runserver", f"{django_settings.host}:{django_settings.port}", *sys.argv[1:])
