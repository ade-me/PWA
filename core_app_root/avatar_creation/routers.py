from rest_framework import routers
router=routers.SimpleRouter()
from core_app_root.avatar_creation.viewsets.create_avatar import CreateAvatar
from core_app_root.avatar_creation.viewsets.edit_avatar_image import EditAvatar

router.register(r'create_avatar',CreateAvatar,basename='create_avatar')

urlpatterns=[
    *router.urls
]
router.register(r'edit_avatar',EditAvatar,basename='edit_avatar')

urlpatterns=[
    *router.urls
]