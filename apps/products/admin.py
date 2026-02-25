from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['order', 'is_active']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'is_featured', 'is_deal']
    list_filter = ['category', 'is_featured', 'is_deal']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['price', 'stock', 'is_featured']
    fieldsets = (
        ('Basic Information', {
            'fields': ('category', 'name', 'slug', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'old_price', 'discount_percent')
        }),
        ('Media', {
            'fields': ('image', 'image2')
        }),
        ('Inventory', {
            'fields': ('stock', 'is_active')
        }),
        ('Deals & Featured', {
            'fields': ('is_featured', 'is_deal', 'deal_expiry')
        }),
    )