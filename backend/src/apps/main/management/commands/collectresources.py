import logging
import shutil

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

        try:
            if settings.RESOURCES_DIR.exists() and clear:
                self.stdout.write(f"Removing existing directory: {settings.RESOURCES_DIR}")
                shutil.rmtree(settings.RESOURCES_DIR)

            if settings.DIST_DIR.exists():
                self.stdout.write(f"Copying resources from {settings.DIST_DIR} to {settings.APP_DIR}")
                shutil.copytree(settings.DIST_DIR, settings.APP_DIR, dirs_exist_ok=True)
            else:
                self.stdout.write(f"Skipping: {settings.DIST_DIR} does not exist")

            if all:
                call_command("collectstatic", "--noinput")

            self.stdout.write(self.style.SUCCESS("Successfully collected resources"))

        except Exception as e:
            logger.error(f"Error collecting resources: {str(e)}")
            self.stderr.write(self.style.ERROR(f"Error: {str(e)}"))
            raise
