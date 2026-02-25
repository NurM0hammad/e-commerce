import os
import sys
from pathlib import Path

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / 'apps'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shopwave.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()