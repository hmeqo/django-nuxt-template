import os
import sys
from pathlib import Path


def is_nuitka() -> bool:
    is_nuitka_standalone = "__compiled__" in globals()
    is_nuitka_onefile = bool(os.getenv("NUITKA_ONEFILE_PARENT"))
    return is_nuitka_standalone or is_nuitka_onefile


def get_base_dir() -> Path:
    if is_nuitka():
        main_file = sys.modules["__main__"].__file__
        if not main_file:
            raise Exception("Main file not found")
        return Path(main_file).parent
    return Path(__file__).resolve().parent.parent.parent


def is_writable(path):
    path = path if isinstance(path, str) else str(path)
    try:
        os.chmod(path, os.stat(path).st_mode)
    except OSError:
        return False
    return True
