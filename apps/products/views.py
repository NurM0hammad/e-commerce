from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import Product, Category

class ShopView(ListView):
    model = Product
    template_name = 'products/shop.html'
    context_object_name = 'products'
    paginate_by = 12

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
        # Category filter
        category_slug = self.request.GET.get('category')
        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)
        
        # Price filter
        max_price = self.request.GET.get('max_price')
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Sorting
        sort = self.request.GET.get('sort', 'default')
        if sort == 'price-asc':
            queryset = queryset.order_by('price')
        elif sort == 'price-desc':
            queryset = queryset.order_by('-price')
        elif sort == 'name-asc':
            queryset = queryset.order_by('name')
            
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.filter(is_active=True)
        context['current_category'] = self.request.GET.get('category', 'all')
        context['current_sort'] = self.request.GET.get('sort', 'default')
        context['current_max_price'] = self.request.GET.get('max_price', 500)
        return context

class CategoryListView(ListView):
    model = Category
    template_name = 'products/categories.html'
    context_object_name = 'categories'
    
    def get_queryset(self):
        return Category.objects.filter(is_active=True)

class CategoryDetailView(DetailView):
    model = Category
    template_name = 'products/category_detail.html'
    context_object_name = 'category'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = self.object.products.filter(is_active=True)[:12]
        return context

class ProductDetailView(DetailView):
    model = Product
    template_name = 'products/product_detail.html'
    context_object_name = 'product'

class DealsView(ListView):
    model = Product
    template_name = 'products/deals.html'
    context_object_name = 'deals'
    
    def get_queryset(self):
        return Product.objects.filter(is_deal=True, is_active=True)[:12]