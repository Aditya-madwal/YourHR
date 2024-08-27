from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("showme/", views.ShowMe.as_view(), name="showme"),
]