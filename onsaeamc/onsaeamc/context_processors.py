# onsaeamc/context_processors.py
import os

def kakao_map_api_key(request):
    return {
        'KAKAO_MAP_API_KEY': os.getenv('KAKAO_MAP_API_KEY')
    }