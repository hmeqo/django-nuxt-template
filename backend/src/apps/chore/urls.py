from django.urls import path

from .views import *

urlpatterns = [
    path("media/<path:path>", media_view),
]
