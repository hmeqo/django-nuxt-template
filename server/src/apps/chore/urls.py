from django.urls import path, re_path

from .views import *

urlpatterns = [
    path("media/<path:path>", media_view),
    re_path(r"^(?P<path>.*)$", serve_template_root),
]
