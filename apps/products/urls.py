from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.ShopView.as_view(), name='shop'),
    path('categories/', views.CategoryListView.as_view(), name='categories'),
    path('deals/', views.DealsView.as_view(), name='deals'),
    path('category/<slug:slug>/', views.CategoryDetailView.as_view(), name='category_detail'),
    path('product/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
]