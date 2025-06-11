# 두 번째 admin.py (MedicalCase)
from django.contrib import admin
from django.contrib import messages
from .models import MedicalCase


# 일괄 삭제 액션 함수
def delete_selected_items(modeladmin, request, queryset):
    """선택된 항목들을 일괄 삭제"""
    count = queryset.count()
    queryset.delete()
    messages.success(request, f'{count}개의 항목이 성공적으로 삭제되었습니다.')

delete_selected_items.short_description = "✓ 선택된 항목 삭제하기"


@admin.register(MedicalCase)
class MedicalCaseAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_published', 'created_at', 'updated_at']
    list_filter = ['category', 'is_published', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_published', 'category']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'category', 'content')
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
    
    def get_queryset(self, request):
        """어드민에서 최신순으로 정렬"""
        qs = super().get_queryset(request)
        return qs.order_by('-created_at')


# 어드민 사이트 커스터마이징
admin.site.site_header = "온새 동물병원 관리자"
admin.site.site_title = "온새 동물병원"
admin.site.index_title = "콘텐츠 관리"