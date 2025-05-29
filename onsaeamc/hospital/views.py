# hospital/views.py
from django.shortcuts import render
from community.models import Notice, Event, Tips
from cases.models import MedicalCase

def index(request):
    """메인 페이지"""
    # 최신 공지사항 3개 가져오기
    notices = Notice.objects.filter(is_published=True).order_by('-created_at')[:3]
    
    # 최신 이벤트 3개 가져오기
    events = Event.objects.filter(is_published=True).order_by('-created_at')[:3]
    
    # 최신 생활백서 1개 가져오기 (메인에서는 1개만 표시)
    tips = Tips.objects.filter(is_published=True).order_by('-created_at')[:1]
    
    # 최신 치료케이스 5개 가져오기 (슬라이더용)
    cases = MedicalCase.objects.filter(is_published=True).order_by('-created_at')[:5]
    
    context = {
        'notices': notices,
        'events': events,
        'tips': tips,
        'cases': cases,
    }
    return render(request, 'hospital/index.html', context)

def intro(request):
    """병원 소개 페이지"""
    return render(request, 'hospital/intro.html')

def doctor_list(request):
    """의료진 소개 페이지"""
    return render(request, 'hospital/doctor_list.html')

def equip_list(request):
    """장비 소개 페이지"""
    return render(request, 'hospital/equip_list.html')

def location(request):
    """오시는 길 페이지"""
    return render(request, 'hospital/location.html')