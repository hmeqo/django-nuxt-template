from django.db import models
from django.db.models import Max
from django.utils.translation import gettext_lazy as _


class TimeStampModel(models.Model):
    created_at = models.DateTimeField(_("Create Time"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Update Time"), auto_now=True)

    class Meta:
        abstract = True


class PathModel(models.Model):
    name = models.CharField(_("Name"), max_length=100)
    path = models.CharField(
        _("Path"), max_length=150, blank=True, help_text=_("Physical storage path, such as '1.3.5'")
    )
    path_display = models.CharField(_("Path Display"), max_length=150, blank=True)
    level = models.PositiveSmallIntegerField(_("Level"), default=1)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="children")

    class Meta:
        abstract = True

    def update_path(self, force_update: bool = False):
        """
        Usage:
        ```
        def save(self, *args, **kwargs):
            super().save(*args, **kwargs)
            self.update_path()
            super().save()
        ```
        """
        if force_update or not self.path:
            parent = self.parent
            if parent:
                self.path = f"{parent.path}.{self.pk}"
                self.level = parent.level + 1
            else:
                self.path = str(self.pk)
                self.level = 1
        self.update_path_display()

    def update_path_display(self, update_descendants: bool = True):
        objects = self.__class__.objects

        if not self.parent:
            self.path_display = self.name
        else:
            ids = self.path.split(".")
            locations = objects.filter(pk__in=ids).order_by("level")
            self.path_display = "/".join(loc.name for loc in locations)

        if update_descendants:
            descendants = objects.filter(path__startswith=f"{self.path}.")
            for descendant in descendants:
                descendant.update_path_display(update_descendants=False)
            objects.bulk_update(descendants, ["path_display"])

    def get_path(self):
        objects = self.__class__.objects

        ids = self.path.split(".")
        lst = [self]
        lst.extend(objects.filter(pk__in=ids).order_by("level"))


class OrderedModel(models.Model):
    """自定义排序模型基类"""

    order = models.PositiveIntegerField(
        _("Order"), default=0, db_index=True, help_text=_("Items will be ordered by this value")
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.pk and (self.order is None or self.order == 0):
            max_order = self.__class__.objects.aggregate(Max("order"))["order__max"] or 0
            self.order = max_order + 1
        super().save(*args, **kwargs)

    @classmethod
    def reorder_items(cls, ordered_ids):
        """批量更新排序顺序

        :param ordered_ids: 按新顺序排列的ID列表
        """
        items = cls.objects.in_bulk(ordered_ids)
        for index, item_id in enumerate(ordered_ids, start=1):
            if item_id in items:
                items[item_id].order = index
        cls.objects.bulk_update(items.values(), ["order"])
