from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = "blogger"
urlpatterns = [
    path("", views.index, name="index"),
    path("read/<int:id>", views.read, name="read"),
    path("delete/<int:id>", views.delete, name="delete"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)