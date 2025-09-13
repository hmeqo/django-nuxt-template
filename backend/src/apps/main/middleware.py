from django.contrib.sessions.middleware import SessionMiddleware
from django.utils.deprecation import MiddlewareMixin


class SessionExpireResetMiddleware(MiddlewareMixin):
    """
    Middleware to reset session expiration on every authenticated request.
    This ensures that the session does not expire as long as the user is actively making requests.
    """

    def process_response(self, request, response):
        if hasattr(request, "user") and request.user.is_authenticated:
            # Force save the session to reset the expiration time
            if hasattr(request, "session") and request.session.session_key:
                request.session.save()
        return response
