from django.contrib.auth.models import User, Group
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Producer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'description', 'unit', 'price')

class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = ('id', 'typeIdentification', 'identificationNumber', 'name', 'image', 'description','address', 'city', 'latitude', 'longitude', 'phoneNumber', 'cooperative', 'active')