from django.db.models.signals import pre_delete
from django.dispatch import receiver

from .models import *


# @receiver(pre_delete, sender=ProductFile)
# def product_file_delete_handler(sender, instance: ProductFile, **kwargs):
#     instance.file.delete()
