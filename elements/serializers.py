from rest_framework import serializers
from elements.models import Element


class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = ['name', 'symbol', 'atomic_number', 'id']
        read_only_fields = ['id']
