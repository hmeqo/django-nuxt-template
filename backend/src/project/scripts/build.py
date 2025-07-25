import sys


def build():
    import subprocess

    cmd = [
        sys.executable,
        "-m",
        "nuitka",
        "src/project/main.py",
        "--follow-imports",
        "--lto=yes",
        # "--pgo-c",
        "--include-package=_json",
        "--include-package=_bisect",
        "--include-package=apps",
        "--include-package=backend",
        # "--include-package=simpleui",
        "--include-package=whitenoise",
        "--include-package=rest_framework",
        "--include-package=drf_spectacular",
        "--include-package=django",
        "--include-package=django_unused_media",
        "--include-package=django_cleanup",
        "--include-package=argon2",
        "--include-package=django_redis",
        "--include-package=psycopg",
        "--include-package-data=dbbackup",
        "--include-data-dir=conf=conf",
        "--include-data-dir=resources=resources",
        "--nofollow-import-to=mypy",
        "--nofollow-import-to=*.tests",
        # "--nofollow-import-to=*.test",
        "--module-parameter=django-settings-module=backend.settings",
        "--standalone",
        "--product-name=DjangoNuxtTemplate",
        "--product-version=1.0.0",
        "--output-dir=build",
        "--output-filename=DjangoNuxtTemplate",
    ]

    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    build()
