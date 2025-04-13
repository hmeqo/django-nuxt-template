import logging
import shutil

from django.conf import settings
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

    def handle(self, *args, **options):
        clear = options["clear"]

        try:
            if not settings.DIST_DIR.exists():
                raise FileNotFoundError(f"Source directory {settings.DIST_DIR} does not exist")

            if settings.RESOURCES_DIR.exists() and clear:
                self.stdout.write(f"Removing existing directory: {settings.RESOURCES_DIR}")
                shutil.rmtree(settings.RESOURCES_DIR)

            self.stdout.write(f"Copying resources from {settings.DIST_DIR} to {settings.APP_DIR}")
            shutil.copytree(settings.DIST_DIR, settings.APP_DIR)

            self.stdout.write(self.style.SUCCESS("Successfully collected resources"))

        except Exception as e:
            logger.error(f"Error collecting resources: {str(e)}")
            self.stderr.write(self.style.ERROR(f"Error: {str(e)}"))
            raise
