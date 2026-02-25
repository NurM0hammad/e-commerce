from django.shortcuts import render
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'core/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        from apps.products.models import Product
        context['featured_products'] = Product.objects.filter(is_featured=True)[:8]
        context['hero_slides'] = [
            {
                'title': 'New <span class="highlight">Collections</span>',
                'desc': 'Modern styles for every occasion',
                'btn': 'Shop Now →',
                'image': 'images/hero/model1.jpg'
            },
            {
                'title': 'Summer <span class="highlight">Sale</span>',
                'desc': 'Up to 50% off selected items',
                'btn': 'Grab Deal →',
                'image': 'images/hero/model2.jpg'
            }
        ]
        return context

class ContactView(TemplateView):
    template_name = 'cart/contact.html'