from django.contrib.auth.models import User, Group
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import viewsets
from .models import Product
from .models import Category, Basket, ItemsPerBasket
from .models import Product, Producer, Order, Item, ShoppingCart,OrderStatus, PaymentMethod,ScheduleOptions

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'description', 'unit', 'price', 'quantity')

# http://www.django-rest-framework.org/api-guide/relations/
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    #products = serializers.PrimaryKeyRelatedField( many=True, read_only=True )
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'products')

class ProducerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Producer
        fields = ('id', 'typeIdentification', 'identificationNumber', 'name', 'image', 'description','address', 'city', 'latitude', 'longitude', 'phoneNumber', 'cooperative', 'active', 'products')

class OrderStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ('id','status')

class PaymentMethodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id','displayName')

class ScheduleOptionsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScheduleOptions
        fields = ('id','weekDay')

class OrdersSerializer(serializers.HyperlinkedModelSerializer):
    status = OrderStatusSerializer(many=False, read_only=True)
    Username = serializers.StringRelatedField(source='user', read_only=True)
    idUser = serializers.PrimaryKeyRelatedField(source='user', read_only=True)
    schedule = ScheduleOptionsSerializer(many=False, read_only=True)
    idSchedule = serializers.PrimaryKeyRelatedField(source='schedule', read_only=True)
    paymentMethod = PaymentMethodSerializer(many=False, read_only=True)
    idPaymentMethod = serializers.PrimaryKeyRelatedField(source='paymentMethod', read_only=True)
    ShoppingCart = serializers.PrimaryKeyRelatedField(source='shoppingCart', read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'status', 'idUser', 'Username', 'idSchedule', 'schedule', 'statusDate',
                  'idPaymentMethod', 'paymentMethod', 'deliveryAddress', 'ShoppingCart', 'createdDate')

class ItemSerializer(serializers.HyperlinkedModelSerializer):
     product = ProductSerializer(read_only=True)
     class Meta:
         model = Item
         fields = ('id', 'quantityOrganic', 'quantityBio', 'quantityClean', 'quantityGeneral',
                   'quantityTotal', 'availability', 'addedDate','product')

class ShoppingCarSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    orders = OrdersSerializer(many=True, read_only=True)
    class Meta:
        model = ShoppingCart
        fields = ('id','createdDate','items','orders')

class ItemPerBasketSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductSerializer(many=False, read_only=True)
    class Meta:
        model = ItemsPerBasket
        fields = ('id', 'quantity', 'product')

class BasketSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemPerBasketSerializer(many=True, read_only=True)
    class Meta:
        model = Basket
        fields = ('id', 'name', 'price', 'description', 'items')
