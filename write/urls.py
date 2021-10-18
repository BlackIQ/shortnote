from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes, name='notes'),
    path('', views.home, name='home')
]