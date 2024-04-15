from rest_framework import serializers
from core_app_root.avatar_creation.models import FileUploadModel
# avatar creation serializer class
class CreateAvatar(serializers.ModelSerializer):
    
    class Meta:
        model=FileUploadModel
        fields=['file']