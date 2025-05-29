from django.contrib import admin
from .models import MedicalCase


@admin.register(MedicalCase)
class MedicalCaseAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_published', 'created_at', 'updated_at']
    list_filter = ['category', 'is_published', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published', 'category']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'category', 'content', 'image')
        }),
        ('설정', {
            'fields': ('is_published',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """어드민에서 최신순으로 정렬"""
        qs = super().get_queryset(request)
        return qs.order_by('-created_at')