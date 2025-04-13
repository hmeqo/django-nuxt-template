import os
import socket
import sys
import time
from multiprocessing import Process

import webview

from project.env import granian_settings
from project.scripts.serve import serve_for_app


class App:
    def __init__(self):
        os.environ["GRANIAN_HOST"] = "127.0.0.1"
        os.environ["GRANIAN_PORT"] = "8001"
        granian_settings.__init__()

        self.server = Process(target=serve_for_app)

    def start(self):
        self.init_window()
        self.init_server()

        self.server.start()
        try:
            webview.start(gui="qt")
            self.wait_server_started()
        finally:
            self.server.terminate()
            self.server.join(timeout=3)
            self.server.kill()

    @staticmethod
    def init_window():
        webview.create_window(
            "Inventory Management",
            f"http://{granian_settings.host}:{granian_settings.port}",
            width=1000,
            height=600,
        )

    @staticmethod
    def init_server():
        import django

        os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
        django.setup()
        from django.core.management import call_command

        call_command("migrate")

    @staticmethod
    def wait_server_started():
        for _ in range(30):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.connect((granian_settings.host, granian_settings.port))
                    break
            except ConnectionRefusedError:
                time.sleep(0.1)
        else:
            print("Failed to connect to the server")
            sys.exit(1)


def main():
    App().start()


if __name__ == "__main__":
    main()
