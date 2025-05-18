# community/views.py
from django.shortcuts import render

def notice_list(request):
    """공지사항 목록 페이지"""
    return render(request, 'community/notice_list.html')

def notice_detail(request, post_id):
    """공지사항 상세 페이지"""
    return render(request, 'community/notice_detail.html', {'post_id': post_id})

def event_list(request):
    """이벤트 목록 페이지"""
    return render(request, 'community/event_list.html')

def event_detail(request, post_id):
    """이벤트 상세 페이지"""
    return render(request, 'community/event_detail.html', {'post_id': post_id})

def tips_list(request):
    """생활백서 목록 페이지"""
    return render(request, 'community/tips_list.html')

def tips_detail(request, post_id):
    """생활백서 상세 페이지"""
    return render(request, 'community/tips_detail.html', {'post_id': post_id})