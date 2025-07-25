import io
import logging
import sys


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


def capture_stdout(to: str):
    logger = logging.getLogger(to)
    logging.captureWarnings(True)
    sys.stdout = StdoutLogger(logger)
    sys.stderr = StderrLogger(logger)
