# ./routers.py

from rest_framework import routers
from menu.viewsets import MenuViewSet
from elements.viewsets import ElementViewSet

router = routers.SimpleRouter()
router.register(r"menu", MenuViewSet, basename="menu")
router.register("element", ElementViewSet)

urlpatterns = router.urls
