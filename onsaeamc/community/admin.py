from django.contrib import admin
from .models import Notice, Event, Tips


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_published', 'created_at', 'updated_at']
    list_filter = ['is_published', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'content', 'image')
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
            'fields': ('title', 'content', 'image')
        }),
        ('이벤트 기간', {
            'fields': ('start_date', 'end_date')
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
            'fields': ('title', 'content', 'image')
        }),
        ('설정', {
            'fields': ('is_published',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


# 어드민 사이트 커스터마이징
admin.site.site_header = "온새 동물병원 관리자"
admin.site.site_title = "온새 동물병원"
admin.site.index_title = "콘텐츠 관리"