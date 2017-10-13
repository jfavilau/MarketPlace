from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
import hello.views

router = routers.DefaultRouter()
router.register(r'products', hello.views.ProductViewSet)
router.register(r'orders', hello.views.OrdersViewSet)
router.register(r'shoppingcar', hello.views.ShoppingCarViewSet)
router.register(r'orderstatus', hello.views.OrderStatusViewSet)

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^orders', hello.views.indexOrders, name='orders'),
    url(r'^updateOrder', hello.views.updateOrder, name='updateOrder'),
    url(r'^oadmin', hello.views.indexOrdersAdmin, name='ordersadmin'),
    #url(r'^api/orders', hello.views.getAllOrderByUser, name='apiorders'),
    url(r'^api/', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^sendEmail/', hello.views.sendEmail, name='sendEmail'),
]
