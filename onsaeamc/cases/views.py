# cases/views.py
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Q
from .models import MedicalCase


def list(request):
    """치료케이스 목록 페이지"""
    # 카테고리 필터
    category = request.GET.get('category', 'all')
    
    # 검색 기능
    search_query = request.GET.get('search', '')
    search_category = request.GET.get('search_category', 'all')
    
    cases = MedicalCase.objects.filter(is_published=True)
    
    # 카테고리 필터링
    if category != 'all':
        cases = cases.filter(category=category)
    
    # 검색 필터링
    if search_query:
        if search_category == 'title':
            cases = cases.filter(title__icontains=search_query)
        elif search_category == 'content':
            cases = cases.filter(content__icontains=search_query)
        else:  # all
            cases = cases.filter(
                Q(title__icontains=search_query) | Q(content__icontains=search_query)
            )
    
    # 페이지네이션
    paginator = Paginator(cases, 9)  # 페이지당 9개 (3x3 그리드)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'category': category,
        'search_query': search_query,
        'search_category': search_category,
    }
    return render(request, 'cases/list.html', context)


def detail(request, case_id):
    """치료케이스 상세 페이지"""
    case = get_object_or_404(MedicalCase, id=case_id, is_published=True)
    
    # 이전글/다음글 (같은 카테고리 내에서)
    prev_case = MedicalCase.objects.filter(
        id__lt=case.id, 
        category=case.category,
        is_published=True
    ).order_by('-id').first()
    
    next_case = MedicalCase.objects.filter(
        id__gt=case.id,
        category=case.category, 
        is_published=True
    ).order_by('id').first()
    
    context = {
        'post': case,  # detail.html에서 post 변수 사용
        'prev_post': prev_case,
        'next_post': next_case,
        'page_type': 'case'  # detail.html에서 구분용
    }
    return render(request, 'cases/detail.html', context)