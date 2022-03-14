from rest_framework import permissions
from users.models import User


class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.role == User.ADMIN:
            return True
        return False