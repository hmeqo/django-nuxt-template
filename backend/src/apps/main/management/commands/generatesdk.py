import shutil
import subprocess
from pathlib import Path

from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate OpenAPI schema and SDK"

    def handle(self, *args, **options):
        frontend_path = Path("../frontend")
        sdk_path = frontend_path / "packages/backend/lib/sdk"
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
            self.stdout.write(self.style.SUCCESS("Successfully generated SDK"))
        except subprocess.CalledProcessError as e:
            self.stdout.write(self.style.ERROR(f"Failed to generate SDK: {e}"))
