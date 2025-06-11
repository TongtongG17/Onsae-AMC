from django.db import models
from django.utils import timezone


class MedicalCase(models.Model):
    """치료케이스 모델"""
    CATEGORY_CHOICES = [
        ('internal', '내과'),
        ('surgery', '외과'),
        ('dental', '치과+안과'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='제목')
    content = models.TextField(verbose_name='내용')
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='internal', 
        verbose_name='진료과목'
    )
    image = models.ImageField(
        upload_to='cases/', 
        blank=True, 
        null=True, 
        verbose_name='대표 이미지'
    )
    image_url = models.URLField(
        blank=True, 
        null=True, 
        verbose_name='이미지 링크 URL',
        help_text='이미지를 클릭했을 때 이동할 URL을 입력하세요'
    )
    is_published = models.BooleanField(default=True, verbose_name='공개여부')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='작성일')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일')
    
    class Meta:
        verbose_name = '치료케이스'
        verbose_name_plural = '치료케이스'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"
