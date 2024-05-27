# ./routers.py

from rest_framework import routers
from menu.viewsets import MenuViewSet

router = routers.SimpleRouter()
router.register("menu", MenuViewSet, basename="menu")
urlpatterns = router.urls