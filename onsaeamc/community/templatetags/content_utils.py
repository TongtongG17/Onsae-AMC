from django import template
import re
import html

register = template.Library()

@register.filter
def extract_first_image(content):
    """CKEditor 콘텐츠에서 첫 번째 이미지 URL 추출"""
    if not content:
        return None
    
    img_pattern = r'<img[^>]+src="([^"]+)"[^>]*>'
    match = re.search(img_pattern, content)
    
    if match:
        return match.group(1)
    return None

@register.filter
def clean_preview(content):
    """HTML 태그 제거 + 엔티티 정리 + 단어 제한"""
    if not content:
        return content
    
    # HTML 태그 제거
    from django.utils.html import strip_tags
    content = strip_tags(content)
    
    # HTML 엔티티 디코딩
    content = html.unescape(content)
    
    # 특수 공백 제거
    content = content.replace('\u00a0', ' ')
    content = re.sub(r'\s+', ' ', content)
    
    return content.strip()