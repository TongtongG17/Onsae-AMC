# medical/views.py
from django.shortcuts import render
from django.shortcuts import redirect

def index(request):
    return redirect('medical:checkup')

def checkup(request):
    """건강검진 페이지"""
    return render(request, 'medical/checkup.html')

def internal(request):
    """일반내과 페이지"""
    return render(request, 'medical/internal.html')

def special(request):
    """중증내과 페이지"""
    return render(request, 'medical/special.html')

def surgery(request):
    """외과 페이지"""
    return render(request, 'medical/surgery.html')

def dental(request):
    """치과/안과 페이지"""
    return render(request, 'medical/dental.html')