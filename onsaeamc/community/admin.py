# 첫 번째 admin.py (Notice, Event, Tips)
from django.contrib import admin
from django import forms
from django.utils import timezone
from django.contrib import messages
from .models import Notice, Event, Tips


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # 내용 필드를 필수가 아니게 설정
        self.fields['content'].required = False
        
        # 새로운 객체일 때만 기본값 설정
        if not kwargs.get('instance'):
            now = timezone.now()
            
            # 시작일 기본값: 오전 9시
            start_default = now.replace(hour=9, minute=0, second=0, microsecond=0)
            self.fields['start_date'].initial = start_default
            
            # 종료일 기본값: 오후 8시  
            end_default = now.replace(hour=20, minute=0, second=0, microsecond=0)
            self.fields['end_date'].initial = end_default


# 일괄 삭제 액션 함수
def delete_selected_items(modeladmin, request, queryset):
    """선택된 항목들을 일괄 삭제"""
    count = queryset.count()
    queryset.delete()
    messages.success(request, f'{count}개의 항목이 성공적으로 삭제되었습니다.')

delete_selected_items.short_description = "✓ 선택된 항목 삭제하기"


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_published', 'created_at', 'updated_at']
    list_filter = ['is_published', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'content')
        }),
        ('이미지 설정', {
            'fields': ('image', 'image_url'),
            'description': '이미지 업로드 후, 이미지 클릭 시 이동할 URL을 입력하세요.'
        }),
        ('설정', {
            'fields': ('is_published',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
    list_display = ['title', 'start_date', 'end_date', 'is_published', 'is_active_status', 'created_at']
    list_filter = ['is_published', 'start_date', 'end_date', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'start_date'
    
    def is_active_status(self, obj):
        return "진행중" if obj.is_active else "종료"
    is_active_status.short_description = '상태'
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'content'),
            'description': '내용은 선택사항입니다. 이미지만 업로드해도 됩니다.'
        }),
        ('이미지 설정', {
            'fields': ('image', 'image_url'),
            'description': '이미지 업로드 후, 이미지 클릭 시 이동할 URL을 입력하세요.'
        }),
        ('이벤트 기간', {
            'fields': ('start_date', 'end_date'),
        }),
        ('설정', {
            'fields': ('is_published',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Tips)
class TipsAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_published', 'created_at', 'updated_at']
    list_filter = ['is_published', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'content')
        }),
        ('이미지 설정', {
            'fields': ('image', 'image_url'),
            'description': '이미지 업로드 후, 이미지 클릭 시 이동할 URL을 입력하세요.'
        }),
        ('설정', {
            'fields': ('is_published',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )