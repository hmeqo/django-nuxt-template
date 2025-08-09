import shutil
import subprocess
from pathlib import Path
from typing import cast

from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate OpenAPI schema and SDK"

    def add_arguments(self, parser):
        parser.add_argument(
            "--frontend-path",
            type=str,
            default="../frontend",
            help="Path to frontend directory (default: ../frontend)",
        )
        parser.add_argument(
            "--sdk-path",
            type=str,
            default="packages/backend/lib/sdk",
            help="Relative path to SDK directory from frontend (default: packages/backend/lib/sdk)",
        )
        parser.add_argument(
            "--noinput",
            action="store_true",
            help="Do not prompt for user input",
        )

    def handle(self, *args, **options):
        try:
            frontend_path = Path(options["frontend_path"]).resolve()
            sdk_path = frontend_path / cast(str, options["sdk_path"])

            if not frontend_path.exists():
                raise ValueError(f"Frontend path does not exist: {frontend_path}")

            self.stdout.write(f"Frontend path: {frontend_path}")
            self.stdout.write(f"SDK path: {sdk_path}")
            if not options["noinput"]:
                confirm = input("Confirm paths? (Y/n): ") or "y"
                if confirm.lower() != "y":
                    self.stdout.write("Operation cancelled by user")
                    return
        except (ValueError, OSError) as e:
            self.stdout.write(self.style.ERROR(f"Invalid path configuration: {e}"))
            return

        schema_path = sdk_path / "schema.json"
        sdk_path.mkdir(parents=True, exist_ok=True)

        for child in sdk_path.iterdir():
            if child.is_file():
                child.unlink()
            else:
                shutil.rmtree(child)

        call_command(
            "spectacular",
            "--format",
            "openapi-json",
            "--file",
            str(schema_path),
            "--validate",
            "--fail-on-warn",
        )

        try:
            subprocess.run(
                [
                    "pnpm",
                    "run",
                    "openapi",
                    "-i",
                    str(schema_path.relative_to(frontend_path)),
                    "--exportSchemas",
                    "true",
                    "-o",
                    str(sdk_path.relative_to(frontend_path)),
                ],
                cwd=str(frontend_path),
                check=True,
            )
            self.stdout.write(self.style.SUCCESS("SDK exported successfully"))
            self.stdout.write(
                "You may need to run 'npm run postinstall' or restart dev server for the changes to take effect"
            )
        except subprocess.CalledProcessError as e:
            self.stdout.write(self.style.ERROR(f"Failed to export SDK: {e}"))
