# views.py
from django.shortcuts import render

def index(request):  # home -> index로 변경
    """메인 페이지"""
    return render(request, 'hospital/index.html')

def intro(request):
    """병원 인삿말 페이지"""
    return render(request, 'hospital/intro.html')

def doctor_list(request):
    """의료진 소개 페이지"""
    return render(request, 'hospital/doctors.html')

def location(request):
    """오시는 길 페이지"""
    return render(request, 'hospital/location.html')