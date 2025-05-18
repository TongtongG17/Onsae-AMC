# community/urls.py
from django.urls import path
from . import views

app_name = 'community'

urlpatterns = [
    path('notice/', views.notice_list, name='notice_list'),
    path('notice/<int:post_id>/', views.notice_detail, name='notice_detail'),
    path('event/', views.event_list, name='event_list'),
    path('event/<int:post_id>/', views.event_detail, name='event_detail'),
    path('tips/', views.tips_list, name='tips_list'),
    path('tips/<int:post_id>/', views.tips_detail, name='tips_detail'),
]