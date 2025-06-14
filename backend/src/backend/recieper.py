def disable_csrf(middlewares: list[str]):
    from rest_framework.authentication import SessionAuthentication

    SessionAuthentication.enforce_csrf = lambda x, r: None  # type: ignore

    if "django.middleware.csrf.CsrfViewMiddleware" in middlewares:
        middlewares.remove("django.middleware.csrf.CsrfViewMiddleware")
