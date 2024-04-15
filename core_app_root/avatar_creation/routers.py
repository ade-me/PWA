from rest_framework import routers
router=routers.SimpleRouter()
from core_app_root.avatar_creation.viewsets.create_avatar import CreateAvatar

router.register(r'create_avatar',CreateAvatar,basename='create_avatar')

urlpatterns=[
    *router.urls
]