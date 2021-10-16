from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('notes/', include('write.urls')),
    path('admin/', admin.site.urls)
]