# medical/urls.py
from django.urls import path
from . import views

app_name = 'medical'

urlpatterns = [
    path('', views.checkup, name='index'),
    path('checkup/', views.checkup, name='checkup'),
    path('internal/', views.internal, name='internal'),
    path('special/', views.special, name='special'),
    path('surgery/', views.surgery, name='surgery'),
    path('dental/', views.dental, name='dental'),
]