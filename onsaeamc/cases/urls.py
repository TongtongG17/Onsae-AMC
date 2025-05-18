# cases/urls.py
from django.urls import path
from . import views

app_name = 'cases'

urlpatterns = [
    path('', views.list, name='list'),
    path('<int:case_id>/', views.detail, name='detail'),
]