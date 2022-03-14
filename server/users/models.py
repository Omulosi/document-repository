from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from . import managers
from .core import CoreModel




class User(PermissionsMixin, CoreModel, AbstractBaseUser):

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

    # Roles
    ADMIN = 1
    GENERAL = 2

    ROLE_CHOICES = (
        (ADMIN, "Admin"),
        (GENERAL, " Normal")
    )


    email = models.EmailField(verbose_name=_("Email"), unique=True)
    # first_name = models.CharField(verbose_name=_("first name"), max_length=30, blank=True, null=True)
    # last_name = models.CharField(verbose_name=_("last name"), max_length=30, blank=True, null=True)

    name = models.CharField(verbose_name=_("full name"), max_length=30, blank=True, null=True)

    is_staff = models.BooleanField(
        _("staff status"), default=False, help_text=_("Designates whether the user can log into this admin site.")
    )
    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active. " "Unselect this instead of deleting accounts."
        ),
    )

    date_joined = models.DateTimeField(default=timezone.now)

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=2)

    access_level = models.PositiveSmallIntegerField(choices=ACCESS_LEVEL_CHOICES, blank=True, null=True, default=0)

    objects = managers.UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ("name", "email")

    def __str__(self):
        return self.get_full_name() or self.email

    def get_short_name(self):
        if self.name:
            return self.name
        return self.email.split("@")[0]

    def get_full_name(self):
        #return " ".join(filter(None, [self.first_name, self.last_name]))
        return self.name

