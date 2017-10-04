from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
import hello.views


# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

router = routers.DefaultRouter()
router.register(r'products', hello.views.ProductViewSet)

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^api/', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^sendEmail/', hello.views.sendEmail, name='sendEmail'),

]
