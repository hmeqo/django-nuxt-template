from pathlib import Path


def get_base_dir() -> Path:
    path = Path(__file__).resolve().parent
    for _ in range(3):
        if any(i.name == "resources" for i in path.iterdir()):
            break
        path = path.parent
    else:
        raise Exception("Base dir not found")
    return path
