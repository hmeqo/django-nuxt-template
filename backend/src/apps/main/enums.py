from django.db.models.enums import TextChoices
from django.utils.translation import gettext_lazy as _


class UserRole(TextChoices):
    EMPLOYEE = "Employee", _("Employee")
