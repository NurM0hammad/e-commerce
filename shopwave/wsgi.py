# wsgi.py in your project root (/opt/render/project/src/)
import os
import sys
from pathlib import Path

# Add the shopwave directory to Python path
shopwave_path = Path(__file__).parent / 'shopwave'
sys.path.append(str(shopwave_path))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shopwave.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()