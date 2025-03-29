import re

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _


@deconstructible
class PasswordValidator(validators.RegexValidator):
    regex = r'^[\w\d`\-=!@#$%^&*()_+[\]{}():;\'",<.>/?\\|]{4,32}$'
    message = _("Enter a valid value.")
    flags = re.ASCII
