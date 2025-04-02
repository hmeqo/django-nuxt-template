from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTMixin:
    authentication_classes = [JWTAuthentication]
