from django.urls import path

from . import views

urlpatterns = [
    path("", views.FileListCreate.as_view(), name="file-list-create"),
    path("upload", views.UploadFiles.as_view(), name="file-upload"),
    path("<pk>", views.FileDetail.as_view(), name="file-detail"),
   
]