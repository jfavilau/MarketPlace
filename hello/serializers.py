from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'image', 'price')

class OrdersSerializer(serializers.HyperlinkedModelSerializer):
    Status = serializers.StringRelatedField(source='status', read_only=True)
    Username = serializers.StringRelatedField(source='user', read_only=True)
    Schedule = serializers.StringRelatedField(source='schedule', read_only=True)
    PaymentMethod = serializers.StringRelatedField(source='paymentMethod', read_only=True)
    ShoppingCart = serializers.PrimaryKeyRelatedField(source='shoppingCart', read_only=True)
    class Meta:
        model = Order
        fields = ('id','Status','Username', 'Schedule', 'statusDate', 'PaymentMethod', 'ShoppingCart'
                  , 'createdDate')



class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price','quantity')

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Item
        fields = ('id', 'quantityOrganic', 'quantityBio', 'quantityClean', 'quantityGeneral',
                  'quantityTotal', 'availability', 'AddedDate','product')

class ShoppingCarSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    orders = OrdersSerializer(many=True, read_only=True)
    class Meta:
        model = ShoppingCart
        fields = ('id','createdDate','items','orders')
        #fields = '__all__'