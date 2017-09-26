from django.db import models
from django.contrib.auth.models import User

# Model Updated, Erick Coral, v 0.1.

class Address(models.Model):

        address = models.CharField(max_length=150, blank=False, null=False)
        latitude = models.FloatField(null=False, blank=False, default=None)
        longitude = models.FloatField(null=False, blank=False, default=None)
        User = models.ForeignKey(User)

class PaymentMethod (models.Model):

        token = models.CharField(max_length=150, blank=False, null=False)
        displayName = models.CharField(max_length=150, blank=False, null=False)
        createdDate = models.DateField(blank=False, null=False)
        user = models.ForeignKey(User)

class OrderStatus (models.Model):

        status = models.CharField(max_length=150, blank=False, null=False)

class ScheduleOptions (models.Model):

        weekDay = models.CharField(max_length=3, blank=False, null=False)
        initialDate = models.DateField(blank=False, null=False)
        finalDate = models.DateField(blank=False, null=False)

class ShoppingCart (models.Model):

        user = models.OneToOneField(User)
        createdDate = models.DateField(blank=False, null=False)

class Order(models.Model):
        user = models.ForeignKey(User)
        status = models.ForeignKey(OrderStatus)
        statusDate = models.DateField(blank=False, null=False)
        schedule = models.ForeignKey(ScheduleOptions)
        paymentMethod = models.ForeignKey(PaymentMethod)
        createdDate = models.DateField(blank=False, null=False)
        shoppingCart = models.ForeignKey(ShoppingCart)

class Category(models.Model):

        shortName = models.CharField(max_length=3, blank=False, null=False)
        name = models.CharField(max_length=150, blank=False, null=False)


class Type(models.Model):

        shortName = models.CharField(max_length=1, blank=False, null=False)
        name = models.CharField(max_length=150, blank=False, null=False)


class Catalogue (models.Model):

        name = models.CharField(max_length=150, blank=False, null=False)
        description = models.TextField(blank=True, null=True)
        active = models.BooleanField(null=False, blank=False)

class City(models.Model):
        name = models.CharField(max_length=150, blank=False, null=False)


class Cooperative(models.Model):

        name = models.CharField(max_length=150, blank=False, null=False)
        city = models.ForeignKey(City)
        active = models.BooleanField(null=False, blank=False)

class Producer (models.Model):

        identificationNumber = models.CharField(max_length=150, blank=False, null=False)
        name = models.CharField(max_length=150, blank=False, null=False)
        address = models.CharField(max_length=150, blank=False, null=False)
        latitude = models.FloatField(null=False, blank=False, default=None)
        longitude = models.FloatField(null=False, blank=False, default=None)
        phoneNumber = models.CharField(max_length=15, blank=False, null=False)
        cooperative = models.ForeignKey(Cooperative)
        active = models.BooleanField(null=False, blank=False)

class Product(models.Model):
        name = models.CharField(max_length=150, blank=False, null=False)
        description = models.TextField(blank=True, null=True)
        unit = models.CharField(max_length=150, blank=False, null=False)
        image = models.CharField(max_length=150, blank=False, null=False)
        quantity = models.FloatField(null=False, blank=False, default=None)
        price = models.FloatField(null=False, blank=False, default=None)
        type = models.ForeignKey(Type)
        category = models.ForeignKey(Category)
        producer = models.ForeignKey(Producer)
        catalogue = models.ForeignKey(Catalogue)
        active = models.BooleanField(null=False, blank=False)

class Item (models.Model):

        quantityOrganic = models.FloatField(null=False, blank=False, default=None)
        quantityBio = models.FloatField(null=False, blank=False, default=None)
        quantityClean = models.FloatField(null=False, blank=False, default=None)
        quantityGeneral = models.FloatField(null=False, blank=False, default=None)
        quantityTotal = models.FloatField(null=False, blank=False, default=None)
        availability = models.BooleanField(null=False, blank=False)
        product = models.ForeignKey(Product)
        shoppingCart = models.ForeignKey(ShoppingCart)
        AddedDate = models.DateField(blank=False, null=False)

class Basket (models.Model):

        name = models.CharField(max_length=150, blank=False, null=False)
        price = models.FloatField(null=False, blank=False, default=None)
        description = models.TextField(blank=True, null=True)
        active = models.BooleanField(null=False, blank=False)

class  ItemsPerBasket (models.Model):

        item = models.ForeignKey(Item)
        basket = models.ForeignKey(Basket)
        active = models.BooleanField(null=False, blank=False)


class RegisteredUser(models.Model):
        user = models.OneToOneField(User)
        city = models.ForeignKey(City)