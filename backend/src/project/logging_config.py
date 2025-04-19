import io
import logging
import logging.config
import sys

from .dirs import app_data_dir


def get_logconfig():
    log_dir = app_data_dir / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "generic": {
                "()": "logging.Formatter",
                "fmt": "%(asctime)s [%(levelname)s] %(message)s",
                "datefmt": "[%Y-%m-%d %H:%M:%S %z]",
            },
            "access": {"()": "logging.Formatter", "fmt": "%(message)s", "datefmt": "[%Y-%m-%d %H:%M:%S %z]"},
        },
        "handlers": {
            "generic_file": {
                "formatter": "generic",
                "class": "logging.FileHandler",
                "filename": str(log_dir / "error.log"),
            },
            "access_file": {
                "formatter": "access",
                "class": "logging.FileHandler",
                "filename": str(log_dir / "access.log"),
            },
        },
        "loggers": {
            "py.warnings": {"handlers": ["generic_file"], "level": "INFO", "propagate": False},
            "_granian": {"handlers": ["generic_file"], "level": "INFO", "propagate": False},
            "granian.access": {"handlers": ["access_file"], "level": "INFO", "propagate": False},
        },
    }

    return config


def setup_logging():
    logging.config.dictConfig(get_logconfig())


class StdoutLogger(io.TextIOWrapper):
    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def write(self, message):
        self.logger.info(message)

    def flush(self):
        pass

    def isatty(self):
        return False


class StderrLogger(io.TextIOWrapper):
    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def write(self, message):
        self.logger.error(message)

    def flush(self):
        pass

    def isatty(self):
        return False


def capture_stdout(to="_granian"):
    logger = logging.getLogger(to)
    logging.captureWarnings(True)
    sys.stdout = StdoutLogger(logger)
    sys.stderr = StderrLogger(logger)
