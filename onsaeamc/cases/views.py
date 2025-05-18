# cases/views.py
from django.shortcuts import render

def list(request):
    """치료케이스 목록 페이지"""
    return render(request, 'cases/list.html')

def detail(request, case_id):
    """치료케이스 상세 페이지"""
    return render(request, 'cases/detail.html', {'case_id': case_id})