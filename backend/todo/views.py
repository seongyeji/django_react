from django.shortcuts import render
from rest_framework import status, viewsets , response

from . import models
from . import serializers

class TodoViewset(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer
from django.shortcuts import render
