
from django.shortcuts import get_object_or_404
from django.db.models import F, Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .serializers import FileSerializer
from .models import File
from .permissions import IsAdminUser

from users.models import User

class FileListCreate(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.all()


        # Top secret user - view all files
        if user.access_level == User.TOP_SECRET:
            queryset = queryset.filter(access_level__lte=File.TOP_SECRET)

        elif user.access_level == User.SECRET:
            queryset = queryset.filter(access_level__lte=File.SECRET)

        elif user.access_level == User.CONFIDENTIAL:
            queryset = queryset.filter(access_level__lte=File.CONFIDENTIAL)

        elif user.access_level == User.RESTRICTED:
            queryset = queryset.filter(access_level__lte=File.RESTRICTED)

        elif user.access_level == User.LOWEST:
            queryset = queryset.filter(access_level__lte=File.LOWEST)

        return queryset
    

class FileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class UploadFiles(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsAdminUser, )

    def post(self, request):
        user = request.user
       
        try:
            files = request.data.getlist('file')

            for file in files:
                full_file_name = file.name
                file_name, file_type = full_file_name.rsplit('.', maxsplit=1)
                query_string = file_name.split('-')[0].strip()
                files_with_name_already_present = File.objects.filter(name__icontains=query_string).all()
                
                if files_with_name_already_present:
                    full_file_name = f"{full_file_name} - ({len(files_with_name_already_present)})"
                data = {'name': full_file_name, 'type': file_type, 'document': file}
                serializer = FileSerializer(data=data)
                
                if serializer.is_valid():
                    file_item = serializer.save()
                    file_item.uploaded_by = user
                    file_item.save()


            return Response({"message": "Projects successfully added to the DB!"},
                            status=status.HTTP_200_OK)

                
        except Exception as e:
            print('Uploading loading file: ', e)
            Response("Error", status=status.HTTP_400_BAD_REQUEST)

        Response("Error", status=status.HTTP_400_BAD_REQUEST)