import uuid
from django.db import models
from uuid import uuid4
from django.utils.translation import gettext_lazy as _

from users.models import User
    
class File(models.Model):
    # Access Levels
    LOWEST = 0
    RESTRICTED = 1
    CONFIDENTIAL = 2
    SECRET = 3
    TOP_SECRET = 4

    ACCESS_LEVEL_CHOICES = (
        (LOWEST, 'Lowest'),
        (RESTRICTED, "RESTRITED"),
        (CONFIDENTIAL, "CONFIDENTIAL"),
        (SECRET, "SECRET"),
        (TOP_SECRET, "TOP SECRET")
    )

    
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True,
                                   db_index=True,
                                   verbose_name=_("created"))
    updated = models.DateTimeField(auto_now=True, verbose_name=_("updated"))

    name = models.CharField(max_length=100, default='')

    type = models.CharField(max_length=100, default='')

    access_level = models.PositiveSmallIntegerField(choices=ACCESS_LEVEL_CHOICES, blank=True, null=True, default=0)

    document = models.FileField(upload_to='documents/', blank=True, null=True)

    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='files', null=True)

    def __str__(self):
        return f'{self.name}'
