import shutil
from pathlib import Path

from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate OpenAPI schemas"

    def add_arguments(self, parser):
        parser.add_argument(
            "path",
            type=str,
            help="Path to ",
        )
        parser.add_argument(
            "--noinput",
            action="store_true",
            help="Do not prompt for user input",
        )

    def handle(self, *args, **options):
        try:
            path = Path(options["path"])

            self.stdout.write(f"Exporting path: {path}")
            if not options["noinput"] and path.exists():
                confirm = input("Path already exists, overwrite? (Y/n): ") or "y"
                if confirm.lower() != "y":
                    self.stdout.write("Operation cancelled by user")
                    return
                if path.is_dir():
                    shutil.rmtree(path)
                else:
                    path.unlink()
        except (ValueError, OSError) as e:
            self.stdout.write(self.style.ERROR(f"Invalid path configuration: {e}"))
            return

        path.parent.mkdir(parents=True, exist_ok=True)

        call_command(
            "spectacular",
            "--format",
            "openapi-json",
            "--file",
            str(path),
            "--validate",
            "--fail-on-warn",
        )
