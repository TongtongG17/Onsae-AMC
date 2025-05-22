from django.urls import path
from . import views

app_name = 'hospital'

urlpatterns = [
    path('', views.index, name='index'),
    path('intro/', views.intro, name='intro'),
    path('doctors/', views.doctor_list, name='doctor_list'),
    path('equips/', views.equip_list, name='equip_list'),
    path('location/', views.location, name='location'),
]