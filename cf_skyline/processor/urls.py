from .views import ActivityDict, STLLink

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('activity/', ActivityDict, name='activity'),
    path('stl/', STLLink, name='activity'),
]