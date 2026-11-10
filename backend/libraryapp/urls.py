from django.urls import path, include
from . import views

urlpatterns = [
    path('admin-login/',views.admin_login),
    path('addCategory/',views.addCategory),
    path('fetchCategories/',views.fetchCategories),
]