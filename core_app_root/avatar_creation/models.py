from django.db import models

# Create your models here.
class FileUploadModel(models.Model):
    file_name=models.CharField(max_length=2000,null=True,blank=True)
    file=models.FileField(upload_to='image_media')

class FileEditModel(models.Model):
    file_name=models.CharField(max_length=2000,null=True,blank=True)
    file=models.FileField(upload_to='image_media')