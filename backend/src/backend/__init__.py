import sys

if sys.version_info >= (3, 10):
    try:
        import django_stubs_ext

        django_stubs_ext.monkeypatch()
    except ModuleNotFoundError:
        pass
