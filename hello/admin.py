from django.contrib import admin
from .models import Address
from .models import PaymentMethod
from .models import OrderStatus
from .models import ScheduleOptions
from .models import ShoppingCart
from .models import Order
from .models import Category
from .models import Type
from .models import Catalogue
from .models import City
from .models import Cooperative
from .models import Producer
from .models import Product
from .models import Item
from .models import Basket
from .models import ItemsPerBasket
from .models import RegisteredUser
# Register your models here.
admin.site.register(Address)
admin.site.register(PaymentMethod)
admin.site.register(OrderStatus)
admin.site.register(ScheduleOptions)
admin.site.register(ShoppingCart)
admin.site.register(Order)
admin.site.register(Category)
admin.site.register(Type)
admin.site.register(Catalogue)
admin.site.register(City)
admin.site.register(Cooperative)
admin.site.register(Producer)
admin.site.register(Product)
admin.site.register(Item)
admin.site.register(Basket)
admin.site.register(ItemsPerBasket)
admin.site.register(RegisteredUser)
