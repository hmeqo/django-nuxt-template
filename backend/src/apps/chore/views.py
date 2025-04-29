from io import BytesIO
from pathlib import Path
from typing import Optional, cast

from django.conf import settings
from django.http import FileResponse, HttpRequest
from django.shortcuts import redirect
from django.utils.translation import gettext_lazy as _
from django.views.static import serve
from drf_apischema import apischema
from drf_spectacular.utils import OpenApiResponse
from PIL import Image
from rest_framework.decorators import api_view

from .serializers import *

# Create your views here.


@apischema(query=MediaQuery, response=OpenApiResponse(str, description=_("Media File")), transaction=False)
@api_view(["get"])
def media_view(request, path: str):
    size: Optional[int] = request.validated_data.get("size")
    if not size:
        return serve(cast(HttpRequest, request), path, document_root=settings.MEDIA_ROOT)
    fp: Path = (settings.MEDIA_ROOT / path).resolve()
    if not fp.relative_to(settings.MEDIA_ROOT) or not fp.exists():
        return redirect("/404")
    try:
        img = Image.open(fp)
    except Exception:
        file = open(fp, "rb")
    else:
        size = min(int(min(img.width, img.height) * 0.5), size)
        img.thumbnail((size, size), Image.Resampling.LANCZOS)
        file = BytesIO()
        file.name = fp
        img.save(file, img.format)
        file.seek(0)
    return FileResponse(file, filename=str(file.name))
