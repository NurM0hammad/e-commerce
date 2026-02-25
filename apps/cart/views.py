from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib import messages
from apps.products.models import Product

def cart_detail(request):
    cart = request.session.get('cart', {})
    cart_items = []
    total = 0
    
    for product_id, quantity in cart.items():
        try:
            product = Product.objects.get(id=product_id, is_active=True)
            item_total = product.price * quantity
            total += item_total
            cart_items.append({
                'product': product,
                'quantity': quantity,
                'total': item_total
            })
        except Product.DoesNotExist:
            continue
    
    context = {
        'cart_items': cart_items,
        'total': total
    }
    return render(request, 'cart/cart_detail.html', context)

@require_POST
def add_to_cart(request):
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    
    cart = request.session.get('cart', {})
    cart[str(product_id)] = cart.get(str(product_id), 0) + quantity
    request.session['cart'] = cart
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'status': 'success',
            'cart_count': sum(cart.values()),
            'message': 'Product added to cart'
        })
    
    messages.success(request, 'Product added to cart')
    return redirect(request.META.get('HTTP_REFERER', 'products:shop'))

@require_POST
def update_cart(request):
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 0))
    
    cart = request.session.get('cart', {})
    
    if quantity <= 0:
        if str(product_id) in cart:
            del cart[str(product_id)]
    else:
        cart[str(product_id)] = quantity
    
    request.session['cart'] = cart
    
    return JsonResponse({
        'status': 'success',
        'cart_count': sum(cart.values())
    })

@require_POST
def remove_from_cart(request):
    product_id = request.POST.get('product_id')
    
    cart = request.session.get('cart', {})
    if str(product_id) in cart:
        del cart[str(product_id)]
    
    request.session['cart'] = cart
    
    return JsonResponse({
        'status': 'success',
        'cart_count': sum(cart.values())
    })