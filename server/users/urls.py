from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name="user_list"),
    path("<pk>/", views.UserDetail.as_view(), name="user-detail"),
    path("me", views.Me.as_view(), name="user-profile"),
    # path("signup/", views.UserCreate.as_view(), name="signup"),
    # path("login/", views.UserLogin.as_view(), name="login"),
]