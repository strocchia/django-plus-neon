from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from elements.models import Element
from elements.serializers import ElementsSerializer

# Create your viewsets here.


class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementsSerializer
    permission_classes = [AllowAny]
