from django.contrib.auth.models import User, Group
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import viewsets
from .models import Product
from .models import Category
from .models import Product, Producer, Order, Item, ShoppingCart,OrderStatus

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'description', 'unit', 'price')

# http://www.django-rest-framework.org/api-guide/relations/
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    #products = serializers.PrimaryKeyRelatedField( many=True, read_only=True )
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'products')

class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = ('id', 'typeIdentification', 'identificationNumber', 'name', 'image', 'description','address', 'city', 'latitude', 'longitude', 'phoneNumber', 'cooperative', 'active')

class OrdersSerializer(serializers.HyperlinkedModelSerializer):
     Status = serializers.StringRelatedField(source='status', read_only=True)
     Username = serializers.StringRelatedField(source='user', read_only=True)
     idUser = serializers.PrimaryKeyRelatedField(source='user', read_only=True)
     Schedule = serializers.StringRelatedField(source='schedule', read_only=True)
     idSchedule = serializers.PrimaryKeyRelatedField(source='schedule', read_only=True)
     PaymentMethod = serializers.StringRelatedField(source='paymentMethod', read_only=True)
     idPaymentMethod = serializers.PrimaryKeyRelatedField(source='paymentMethod', read_only=True)
     ShoppingCart = serializers.PrimaryKeyRelatedField(source='shoppingCart', read_only=True)
     class Meta:
         model = Order
         fields = ('id','Status','idUser','Username','idSchedule', 'Schedule', 'statusDate',
                   'idPaymentMethod', 'PaymentMethod','deliveryAddress', 'ShoppingCart', 'createdDate')

class OrderStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ('id','status')

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
