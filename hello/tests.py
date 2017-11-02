from django.test import TestCase, RequestFactory

from .services import *
from .models import *


class BasketTest(TestCase):

    def setUp(self):
        City.objects.create(id=1, name="Medellin", shortName="MED")
        Category.objects.create(id=1,shortName="FRU", name="Frutas")
        Category.objects.create(id=2,shortName="VER", name="Verduras")

        Type.objects.create(id=1,shortName="L", name="Agr. Limpia")
        Type.objects.create(id=2,shortName="B", name="Bio")
        Type.objects.create(id=3,shortName="O", name="Organica")

        city_fk = City.objects.get(id=1)
        Cooperative.objects.create(
            id=2, name="Cooperativa Bogota", city=city_fk, active=True)

        coop_fk = Cooperative.objects.get(id=2)
        Producer.objects.create(id=1, typeIdentification="Cedula de Ciudadania", identificationNumber="10101010", name="Alejandro",
                                image="http://test.com", description="Test", address="Cll test ", city=city_fk, latitude=0,
                                longitude=0, phoneNumber="10101012", cooperative=coop_fk, active=True)

        type_fk = Type.objects.get(id=1)
        category_fk = Category.objects.get(id=1)
        producer_fk = Producer.objects.get(id=1)
        Product.objects.create(id=1, name="Banano", description="test", unit="KG",
                               image="http://test.com", quantity=10, price=1000, type=type_fk, category=category_fk,
                               producer=producer_fk, active=True)

        Basket.objects.create(
            id=1, name="Basket 1", description="test", price=5000, active=True)

    def test_AddItemToBasket(self):
        # Test Basket services
        result = add_item_basket_service(1, 1, 10)
        self.assertEqual(result, True, "Un Item Canasta")

    def test_AddItemToBasket_EmptyBasket(self):
        # Test Basket services
        empty_basket = add_item_basket_service(None, 1, 10)
        self.assertEqual(empty_basket, False, "Canasta Vacia")




