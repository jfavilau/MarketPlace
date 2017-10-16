from django.conf.urls import url
from . import views

app_name = 'hello'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^product_list/$',views.product_list, name='product_list'),
]
