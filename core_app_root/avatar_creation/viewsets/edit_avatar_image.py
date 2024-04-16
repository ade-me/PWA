from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from core_app_root.avatar_creation.serializers.edit_avatar import EditAvatar
class EditAvatar(viewsets.ModelViewSet):
    serializer_class=EditAvatar
    http_method_names=['post']
    def create(self,request):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_validated():
            return Response({"status":True,},status=status.HTTP_200_OK)