from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
# Model Updated, Erick Coral, v 0.1.


class UserForm (ModelForm):
    class Meta:
        model = User
        fields = ['last_name', 'first_name']

    nombre = forms.CharField(max_length=20)
    apellido = forms.CharField(max_length=20)
    email = forms.EmailField()
    nombre_usuario = forms.CharField(max_length=50)
    clave = forms.CharField(widget=forms.PasswordInput())
    confirme_clave = forms.CharField(widget=forms.PasswordInput())


class Address(models.Model):
    address = models.CharField(max_length=150, blank=False, null=False)
    detail = models.CharField(max_length=150, blank=False, null=False, default="")
    latitude = models.FloatField(null=False, blank=False, default=None)
    longitude = models.FloatField(null=False, blank=False, default=None)
    zipCode = models.CharField(max_length=10, blank=False, null=False, default="")
    user = models.ForeignKey(User)


class PaymentMethod (models.Model):
    token = models.CharField(max_length=150, blank=False, null=False)
    displayName = models.CharField(max_length=150, blank=False, null=False)
    createdDate = models.DateField(blank=False, null=False)
    user = models.ForeignKey(User)
    active = models.BooleanField(null=False, blank=False, default=True)
    def __unicode__(self):
        return self.displayName


class OrderStatus (models.Model):
    status = models.CharField(max_length=150, blank=False, null=False)
    def __unicode__(self):
        return self.status


class ScheduleOptions (models.Model):
    weekDay = models.CharField(max_length=3, blank=False, null=False)
    initialDate = models.DateField(blank=False, null=False)
    finalDate = models.DateField(blank=False, null=False)
    def __unicode__(self):
        return self.weekDay


class ShoppingCart (models.Model):
    user = models.ForeignKey(User)
    createdDate = models.DateField(blank=False, null=False, auto_now_add=True)
    value = models.FloatField(null=False, blank=False, default=0)
    active = models.BooleanField(null=False, blank=False, default=True)
    def __str__(self):
        return self.user.username
    def __unicode__(self):
        return self.__str__


class Order(models.Model):
    user = models.ForeignKey(User)
    status = models.ForeignKey(OrderStatus)
    statusDate = models.DateField(blank=False, null=False)
    schedule = models.ForeignKey(ScheduleOptions)
    paymentMethod = models.ForeignKey(PaymentMethod)
    createdDate = models.DateField(blank=False, null=False, auto_now_add=True)
    shoppingCart = models.ForeignKey(ShoppingCart, related_name='orders')


class Category(models.Model):
    shortName = models.CharField(max_length=3, blank=False, null=False)
    name = models.CharField(max_length=150, blank=False, null=False)
    def __str__(self):
        return self.name


class Type(models.Model):
    shortName = models.CharField(max_length=1, blank=False, null=False)
    name = models.CharField(max_length=150, blank=False, null=False)
    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    shortName = models.CharField(max_length=3, blank=False, null=False)
    def __str__(self):
        return self.name


class Cooperative(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    city = models.ForeignKey(City)
    active = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return self.name


class Producer (models.Model):
    typeIdentification = models.CharField(
        max_length=150, blank=False, null=False, default="Cedula de Ciudadania")
    identificationNumber = models.CharField(max_length=150, blank=False, null=False)
    name = models.CharField(max_length=150, blank=False, null=False)
    image = models.CharField(max_length=250, blank=False, null=False,
                             default="https://definicion.mx/wp-content/uploads/2013/11/usuario.jpg")
    description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=150, blank=False, null=False)
    city = models.CharField(max_length=150, blank=False, null=False, default="Bogota")
    latitude = models.FloatField(null=False, blank=False, default=None)
    longitude = models.FloatField(null=False, blank=False, default=None)
    phoneNumber = models.CharField(max_length=15, blank=False, null=False)
    cooperative = models.ForeignKey(Cooperative)
    active = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    unit = models.CharField(max_length=150, blank=False, null=False)
    image = models.CharField(max_length=250, blank=False, null=False)
    quantity = models.FloatField(null=False, blank=False, default=None)
    price = models.FloatField(null=False, blank=False, default=None)
    type = models.ForeignKey(Type)
    category = models.ForeignKey(Category, related_name='products')
    producer = models.ForeignKey(Producer, related_name='products')
    cooperative = models.ForeignKey(Cooperative, null=True)
    active = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return self.name


class Item (models.Model):
    quantityOrganic = models.FloatField(null=False, blank=False, default=None)
    quantityBio = models.FloatField(null=False, blank=False, default=None)
    quantityClean = models.FloatField(null=False, blank=False, default=None)
    quantityGeneral = models.FloatField(null=False, blank=False, default=None)
    quantityTotal = models.FloatField(null=False, blank=False, default=None)
    availability = models.BooleanField(null=False, blank=False)
    totalPrice = models.FloatField(null=False, blank=False, default=0)
    product = models.ForeignKey(Product)
    shoppingCart = models.ForeignKey(ShoppingCart, related_name='items')
    addedDate = models.DateField(blank=False, null=False)
    def __str__(self):
        return self.product.name
    def __unicode__(self):
        return self.__str__


class Basket (models.Model):
    name = models.CharField(max_length=150, blank=False, null=False)
    price = models.FloatField(null=False, blank=False, default=None)
    description = models.TextField(blank=True, null=True)
    active = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return self.name


class ItemsPerBasket (models.Model):
    product = models.ForeignKey(Product)
    basket = models.ForeignKey(Basket, related_name='items')
    quantity = models.FloatField(null=False, blank=False, default=None)
    active = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return self.product.name


class RegisteredUser(models.Model):
    user = models.OneToOneField(User)
    phoneNumber = models.CharField(max_length=15, blank=False, null=False, default="888888888")
    city = models.ForeignKey(City)