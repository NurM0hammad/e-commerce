from django import template
from apps.products.models import Category

register = template.Library()

@register.simple_tag
def get_categories(limit=4):
    """Get categories for homepage"""
    try:
        return Category.objects.filter(is_active=True).order_by('order')[:limit]
    except:
        return []

@register.simple_tag
def get_nav_categories(limit=5):
    """Get categories for navigation"""
    try:
        return Category.objects.filter(is_active=True).order_by('order')[:limit]
    except:
        return []

@register.inclusion_tag('includes/category_menu.html')
def render_category_menu():
    """Render category menu as HTML"""
    categories = Category.objects.filter(is_active=True).order_by('order')[:5]
    return {'categories': categories}