from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
import hello.views


# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

router = routers.DefaultRouter()
router.register(r'users', hello.views.UserViewset, base_name="users")
router.register(r'products', hello.views.ProductViewset, base_name="products")
router.register(r'categories', hello.views.CategoryViewset, base_name="categories")
router.register(r'baskets', hello.views.BasketViewset, base_name="baskets")
router.register(r'orders', hello.views.OrdersViewSet)
router.register(r'shoppingcar', hello.views.ShoppingCarViewSet)
router.register(r'orderstatus', hello.views.OrderStatusViewSet)

# API endpoints

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^catalogo/', hello.views.catalogue, name='catalogo'),
    url(r'^canastas/', hello.views.baskets, name='canastas'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^sendEmail/', hello.views.sendEmail, name='sendEmail'),
    url(r'^addPaymentMethod/', hello.views.addPaymentMethod, name='addPaymentMethod'),
    url(r'^api/', include(router.urls, namespace="api")),
    url(r'^checkOut/', hello.views.checkOut, name='checkOut'),
    url(r'^checkOutPersist/', hello.views.checkOutPersist, name='checkOutPersist'),
    url(r'^paymentMethods/', hello.views.paymentMethods, name='paymentMethods'),
    url(r'^removePaymentMethods/', hello.views.removePaymentMethods, name='removePaymentMethods'),
    url(r'^registerProducer/', hello.views.regProducer, name='regProducer'),
    url(r'^mapProducer/', hello.views.mapProducer, name='mapProducer'),
    url(r'^producers/$', hello.views.ProducerList.as_view(), name='producers-list'),
    url(r'^producers/(?P<pk>[0-9]+)/$', hello.views.ProducerDetail.as_view(), name='producers-detail'),
    url(r'^addUser/$',hello.views.registro, name='addUser'),
    url(r'^regUser/$',hello.views.regUser, name='regUser'),
    url(r'^orders', hello.views.indexOrders, name='orders'),
    url(r'^updateOrder', hello.views.updateOrder, name='updateOrder'),
    url(r'^oadmin', hello.views.indexOrdersAdmin, name='ordersadmin'),
    url(r'^shoppingCartPersist/', hello.views.shoppingCartPersist, name='shoppingCartPersist'),
    url(r'^loginLogic/', hello.views.login_logic, name='loginLogic'),
    url(r'^login/', hello.views.login_view, name='login'),
]

# Login and logout views for the browsable API
urlpatterns += [
     url(r'^auth/', include('rest_framework.urls',
                                namespace='rest_framework')),
]