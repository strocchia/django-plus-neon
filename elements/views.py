from django.shortcuts import render
from .models import Element

# Create your views here.


def elements_list(request):
    elements = Element.objects.all()
    return render(request, 'elements_list.html', {'elements': elements})
