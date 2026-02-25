from apps.products.models import Category

def cart_count(request):
    """Add cart count to all templates"""
    cart = request.session.get('cart', {})
    count = sum(cart.values())
    return {'cart_count': count}

def categories(request):
    """Add categories to all templates"""
    categories_qs = Category.objects.filter(is_active=True).order_by('order')[:5]
    return {
        'nav_categories': categories_qs,  # For navigation
        'categories': categories_qs,       # For homepage grid
    }