from .views import ActivityDict

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('activity/', ActivityDict, name='activity'),
]