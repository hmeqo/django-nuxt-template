import os
import sys

import django

os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
django.setup()


def dev():
    from django.core.management import call_command

    call_command("runserver", *sys.argv[1:])
