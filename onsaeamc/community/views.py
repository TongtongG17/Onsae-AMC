# community/views.py 
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Notice, Event, Tips


def notice_list(request):
    """공지사항 목록"""
    # 검색 기능
    search_query = request.GET.get('search', '')
    search_category = request.GET.get('category', 'all')
    
    notices = Notice.objects.filter(is_published=True)
    
    if search_query:
        if search_category == 'title':
            notices = notices.filter(title__icontains=search_query)
        elif search_category == 'content':
            notices = notices.filter(content__icontains=search_query)
        else:  # all
            notices = notices.filter(
                Q(title__icontains=search_query) | Q(content__icontains=search_query)
            )
    
    # 페이지네이션
    paginator = Paginator(notices, 10)  # 페이지당 10개
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'search_category': search_category,
        'page_type': 'notice'
    }
    return render(request, 'community/notice_list.html', context)


def notice_detail(request, post_id):
    """공지사항 상세"""
    notice = get_object_or_404(Notice, id=post_id, is_published=True)
    
    # 이전글/다음글
    prev_post = Notice.objects.filter(
        id__lt=notice.id, is_published=True
    ).order_by('-id').first()
    
    next_post = Notice.objects.filter(
        id__gt=notice.id, is_published=True
    ).order_by('id').first()
    
    context = {
        'post': notice,
        'prev_post': prev_post,
        'next_post': next_post,
        'page_type': 'notice'
    }
    return render(request, 'community/detail.html', context)


def event_list(request):
    """이벤트 목록"""
    search_query = request.GET.get('search', '')
    search_category = request.GET.get('category', 'all')
    
    events = Event.objects.filter(is_published=True)
    
    if search_query:
        if search_category == 'title':
            events = events.filter(title__icontains=search_query)
        elif search_category == 'content':
            events = events.filter(content__icontains=search_query)
        else:  # all
            events = events.filter(
                Q(title__icontains=search_query) | Q(content__icontains=search_query)
            )
    
    # 페이지네이션
    paginator = Paginator(events, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'search_category': search_category,
        'page_type': 'event'
    }
    return render(request, 'community/event_list.html', context)


def event_detail(request, post_id):
    """이벤트 상세"""
    event = get_object_or_404(Event, id=post_id, is_published=True)
    
    # 이전글/다음글
    prev_post = Event.objects.filter(
        id__lt=event.id, is_published=True
    ).order_by('-id').first()
    
    next_post = Event.objects.filter(
        id__gt=event.id, is_published=True
    ).order_by('id').first()
    
    context = {
        'post': event,
        'prev_post': prev_post,
        'next_post': next_post,
        'page_type': 'event'
    }
    return render(request, 'community/detail.html', context)


def tips_list(request):
    """생활백서 목록"""
    search_query = request.GET.get('search', '')
    search_category = request.GET.get('category', 'all')
    
    tips = Tips.objects.filter(is_published=True)
    
    if search_query:
        if search_category == 'title':
            tips = tips.filter(title__icontains=search_query)
        elif search_category == 'content':
            tips = tips.filter(content__icontains=search_query)
        else:  # all
            tips = tips.filter(
                Q(title__icontains=search_query) | Q(content__icontains=search_query)
            )
    
    # 페이지네이션
    paginator = Paginator(tips, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'search_category': search_category,
        'page_type': 'tips'
    }
    return render(request, 'community/tips_list.html', context)


def tips_detail(request, post_id):
    """생활백서 상세"""
    tip = get_object_or_404(Tips, id=post_id, is_published=True)
    
    # 이전글/다음글
    prev_post = Tips.objects.filter(
        id__lt=tip.id, is_published=True
    ).order_by('-id').first()
    
    next_post = Tips.objects.filter(
        id__gt=tip.id, is_published=True
    ).order_by('id').first()
    
    context = {
        'post': tip,
        'prev_post': prev_post,
        'next_post': next_post,
        'page_type': 'tips'
    }
    return render(request, 'community/detail.html', context)