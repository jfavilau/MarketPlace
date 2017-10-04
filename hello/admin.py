from django.contrib import admin

from .models import City
from .models import Cooperative
from .models import Producer
from .models import Type
from .models import Category
from .models import Product
# Register your models here.
admin.site.register(City)
admin.site.register(Cooperative)
admin.site.register(Producer)
admin.site.register(Type)
admin.site.register(Category)
admin.site.register(Product)