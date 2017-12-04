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
router.register(r'producers', hello.views.ProducerViewset, base_name="producers")
router.register(r'categories', hello.views.CategoryViewset, base_name="categories")
router.register(r'baskets', hello.views.BasketViewset, base_name="baskets")
router.register(r'orders', hello.views.OrdersViewSet)
router.register(r'shoppingcar', hello.views.ShoppingCarViewSet)
router.register(r'orderstatus', hello.views.OrderStatusViewSet)
router.register(r'type', hello.views.TypeViewset, base_name="type")
router.register(r'cooperatives', hello.views.CooperativesViewSet)
router.register(r'cities', hello.views.CitiesViewSet)

# API endpoints

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^catalogo/', hello.views.catalogue, name='catalogo'),
    url(r'^canastas/', hello.views.baskets, name='canastas'),
    url(r'^canastasAdmin/', hello.views.basketsAdmin, name='canastasAdmin'),
    url(r'^cooperativas/', hello.views.cooperativas, name='cooperativas'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^sendEmail/', hello.views.sendEmail, name='sendEmail'),
    url(r'^addPaymentMethod/', hello.views.addPaymentMethod, name='addPaymentMethod'),
    url(r'^api/', include(router.urls, namespace="api")),
    url(r'^checkOut/', hello.views.checkOut, name='checkOut'),
    url(r'^checkOutPersist/', hello.views.checkOutPersist, name='checkOutPersist'),
    url(r'^paymentMethods/', hello.views.paymentMethods, name='paymentMethods'),
    url(r'^removePaymentMethods/', hello.views.removePaymentMethods, name='removePaymentMethods'),
    url(r'^registerProducer/', hello.views.regProducer, name='regProducer'),
    url(r'^registerProducts/', hello.views.regProducts, name='regProducts'),
    url(r'^registerProductsWeek/', hello.views.regProductsWeek, name='regProductsWeek'),
    url(r'^production', hello.views.production, name='production'),
    url(r'^addProduction', hello.views.addProduction, name='addProduction'),
    url(r'^mapProducer/', hello.views.mapProducer, name='mapProducer'),
    url(r'^createProduct/', hello.views.createProduct, name='product-create'),
    url(r'^updateProductStock/', hello.views.updateProductStock, name='update-product-stock'),
    url(r'^createProducer/', hello.views.createProducer, name='producers-create'),
    url(r'^producers/$', hello.views.ProducerList.as_view(), name='producers-list'),
    url(r'^producers_list/$', hello.views.producers_list, name='producers_list'),
    url(r'^producers/(?P<pk>[0-9]+)/$', hello.views.ProducerDetail.as_view(), name='producers-detail'),
    url(r'^productores/(?P<producer_id>[0-9]+)/$', hello.views.productor_detail, name='productor-detail'),
    url(r'^addUser/$',hello.views.registro, name='addUser'),
    url(r'^regUser/$',hello.views.regUser, name='regUser'),
    url(r'^orders', hello.views.indexOrders, name='orders'),
    url(r'^updateOrder', hello.views.updateOrder, name='updateOrder'),
    url(r'^oadmin', hello.views.indexOrdersAdmin, name='ordersadmin'),
    url(r'^shoppingCartPersist/', hello.views.shoppingCartPersist, name='shoppingCartPersist'),
    url(r'^loginLogic/', hello.views.login_logic, name='loginLogic'),
    url(r'^login/', hello.views.login_view, name='login'),
    url(r'^logout/', hello.views.logout_view, name='logout'),
    url(r'^myProducts', hello.views.myProducts, name='myProduct'),
    url(r'^updateProductActive', hello.views.updateProductActive, name='updateProductActive'),
    url(r'^updateProducts', hello.views.updateProduct, name='updateProducts'),
    url(r'^updateProduct', hello.views.updateProductView, name='updateProduct'),
    url(r'^basketList/', hello.views.list_products_basket_view, name='basketList'),
    url(r'^basketEdit', hello.views.edit_products_basket_view, name='editBasket'),
    url(r'^addItemBasket', hello.views.add_item_basket, name='addItemBasket'),
    url(r'^removeItemBasket', hello.views.remove_item_basket, name='removeItemBasket'),
    url(r'^editCatalogue', hello.views.remove_item_catalogue_view, name='removeItemCatalogueView'),
    url(r'^removeProductAdmin', hello.views.remove_product_logic, name='removeProduct'),
    url(r'^producers_list/editProducer/(?P<producer_id>[0-9]+)/$', hello.views.productor_edit, name='productor-edit'),
    url(r'^productPrice', hello.views.product_price_logic, name='productPrice'),
    url(r'^advanceValidation', hello.views.validate_advance_purchase, name='validatePurchase'),
    url(r'^getEstimatePrice', hello.views.getEstimatePrice, name='estimatePrice'),
    url(r'^stockStatistics', hello.views.stockStatistics, name='stockStatistics'),
    url(r'^getWeeklyProducts', hello.views.get_week_products, name='weeklyProducts'),
]

# Login and logout views for the browsable API
urlpatterns += [
     url(r'^auth/', include('rest_framework.urls',
                                namespace='rest_framework')),
]

urlpatterns += router.urls
