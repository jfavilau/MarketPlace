from django.contrib.auth.models import User, Group
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import viewsets
from .models import Product
from .models import Category

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