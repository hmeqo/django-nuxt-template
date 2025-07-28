import logging
import os
import shutil
import subprocess

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Collects static resources from DIST_DIR to RESOURCES_DIR"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Clear the destination directory before copying.",
        )
        parser.add_argument(
            "--all",
            action="store_true",
            help="Run collectstatic after copying resources.",
        )

    def handle(self, *args, **options):
        clear = options["clear"]
        all = options["all"]
        verbosity = options["verbosity"]

        os.makedirs(settings.ASSETS_DIR, exist_ok=True)
        try:
            rsync_path = shutil.which("rsync")
            if rsync_path:
                if verbosity > 0:
                    self.stdout.write(f"Copying resources from {settings.DIST_DIR} to {settings.ASSETS_DIR}")
                commands = [
                    "rsync",
                    "-a",
                    *(["-v"] if verbosity > 0 else []),
                    *(["--del"] if clear else []),
                    str(settings.DIST_DIR),
                    str(settings.ASSETS_DIR),
                ]
                subprocess.run(commands, check=True)
            else:
                if settings.RESOURCES_DIR.exists() and clear:
                    if verbosity > 0:
                        self.stdout.write(f"Removing existing directory: {settings.RESOURCES_DIR}")
                    shutil.rmtree(settings.RESOURCES_DIR)

                if settings.DIST_DIR.exists():
                    if verbosity > 0:
                        self.stdout.write(f"Copying resources from {settings.DIST_DIR} to {settings.ASSETS_DIR}")
                    shutil.copytree(settings.DIST_DIR, settings.ASSETS_DIR, dirs_exist_ok=True)
                else:
                    if verbosity > 0:
                        self.stdout.write(f"Skipping: {settings.DIST_DIR} does not exist")

            if all:
                call_command("collectstatic", "--noinput")

        except Exception as e:
            logger.error(f"Error collecting resources: {str(e)}")
            self.stderr.write(self.style.ERROR(f"Error: {str(e)}"))
            raise
        else:
            if verbosity > 0:
                self.stdout.write(self.style.SUCCESS("Successfully collected resources"))
