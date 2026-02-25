# save as find_project.py
import os
from pathlib import Path

print("="*60)
print("🔍 DJANGO PROJECT FINDER")
print("="*60)

print(f"\n📂 Current directory: {os.getcwd()}")
print("\n📁 Looking for Django project structure...")

found = False
for root, dirs, files in os.walk('.'):
    if 'wsgi.py' in files and 'settings.py' in files:
        rel_path = Path(root)
        module_name = rel_path.name
        print(f"\n✅ FOUND DJANGO PROJECT: {rel_path}")
        print(f"   Module name: {module_name}")
        print(f"   Full path: {rel_path.absolute()}")
        print(f"\n👉 Your Procfile should be:")
        print(f"   web: gunicorn {module_name}.wsgi:application --log-file -")
        found = True

if not found:
    print("\n❌ No Django project found!")
    print("\n📋 Directory contents:")
    for item in os.listdir('.'):
        if os.path.isdir(item):
            print(f"  📁 {item}/")
            # Check inside
            sub_items = os.listdir(item)
            if 'wsgi.py' in sub_items:
                print(f"     ✅ Contains wsgi.py - This is your Django project!")
                print(f"     👉 Use: gunicorn {item}.wsgi:application")
        else:
            print(f"  📄 {item}")

print("\n" + "="*60)