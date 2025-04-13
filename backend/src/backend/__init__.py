import sys

if sys.version_info >= (3, 10):
    import django_stubs_ext

    django_stubs_ext.monkeypatch()
