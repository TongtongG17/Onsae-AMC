# test_server.py 수정
import os
import django
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'onsaeamc.settings')
django.setup()

if __name__ == '__main__':
    print("Starting Django server without auto-reload...")
    execute_from_command_line(['manage.py', 'runserver', '--noreload', '127.0.0.1:8000'])