from django.db import models
from django.utils import timezone


class Notice(models.Model):
    """공지사항 모델"""
    title = models.CharField(max_length=200, verbose_name='제목')
    content = models.TextField(verbose_name='내용')
    image = models.ImageField(upload_to='notices/', blank=True, null=True, verbose_name='이미지')
    is_published = models.BooleanField(default=True, verbose_name='공개여부')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='작성일')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일')
    
    class Meta:
        verbose_name = '공지사항'
        verbose_name_plural = '공지사항'
        ordering = ['-created_at']  # 최신순 정렬
    
    def __str__(self):
        return self.title


class Event(models.Model):
    """이벤트 모델"""
    title = models.CharField(max_length=200, verbose_name='제목')
    content = models.TextField(verbose_name='내용')
    image = models.ImageField(upload_to='events/', blank=True, null=True, verbose_name='이미지')
    start_date = models.DateTimeField(verbose_name='시작일')
    end_date = models.DateTimeField(verbose_name='종료일')
    is_published = models.BooleanField(default=True, verbose_name='공개여부')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='작성일')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일')
    
    class Meta:
        verbose_name = '이벤트'
        verbose_name_plural = '이벤트'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def is_active(self):
        """현재 진행중인 이벤트인지 확인"""
        now = timezone.now()
        return self.start_date <= now <= self.end_date


class Tips(models.Model):
    """반려동물 생활백서 모델"""
    title = models.CharField(max_length=200, verbose_name='제목')
    content = models.TextField(verbose_name='내용')
    image = models.ImageField(upload_to='tips/', blank=True, null=True, verbose_name='이미지')
    is_published = models.BooleanField(default=True, verbose_name='공개여부')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='작성일')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일')
    
    class Meta:
        verbose_name = '생활백서'
        verbose_name_plural = '생활백서'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title