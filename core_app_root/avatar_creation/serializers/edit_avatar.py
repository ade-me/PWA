from rest_framework import serializers
from core_app_root.avatar_creation.models import FileEditModel
# avatar creation serializer class
from rest_framework import serializers

class BodyOptionsSerializer(serializers.Serializer):
    body_rotation = serializers.IntegerField(required=False)
    body_tone = serializers.CharField(max_length=1000, required=False)

class HeadOptionsSerializer(serializers.Serializer):
    head_rotation = serializers.IntegerField(required=False)
    eye_color = serializers.CharField(max_length=50, required=False)
    hair_color = serializers.CharField(max_length=50, required=False)

class EditAvatar(serializers.ModelSerializer):
    background_color = serializers.CharField(max_length=50, required=False)
    body_options = BodyOptionsSerializer(required=False)
    head_options = HeadOptionsSerializer(required=False)

    class Meta:
        model = FileEditModel
        fields = ['file', 'background_color', 'body_options', 'head_options']
