# import json
#
# from .services import Cooperative, City
# from .models import Producer
# from rest_framework.test import APIRequestFactory
# from rest_framework import status
# from rest_framework.test import APITestCase
#
# class UpdateProducerTestCase(APITestCase):
#
#     def setUp(self):
#
#         City.objects.create(id=1, name="Bogota", shortName="BOG")
#
#         city_fk = City.objects.get(id=1)
#
#         Cooperative.objects.create(
#             id=2, name="Cooperativa Bogota", city=city_fk, active=True)
#
#         coop_fk = Cooperative.objects.get(id=2)
#
#         Producer.objects.create(id = 1,
#                                 typeIdentification = "Cedula de Ciudadania",
#                                 identificationNumber = "1032440498",
#                                 name = "Camilo Baquero Jimenez",
#                                 image = "https://definicion.mx/wp-content/uploads/2013/11/usuario.jpg",
#                                 description = "Mi descripcion",
#                                 address = "Calle 45 # 45 - 47",
#                                 city = city_fk,
#                                 latitude = 4.6513722,
#                                 longitude = -74.0593757,
#                                 phoneNumber = "7046004",
#                                 cooperative = coop_fk,
#                                 active = True)
#
#         self.productor = Producer.objects.get(id=1)
#
#         self.factory = APIRequestFactory()
#
#
#
#     def test_update_producer(self):
#         """Test the api can update a given producer."""
#         response = self.client.put('/api/producers/1/', {'name': 'Camilo',
#                                                          'phoneNumber': '412543',
#                                                          'identificationNumber': '1532524',
#                                                          'cooperative': 2,
#                                                          'address': "Calle"}, format='json')
#
#         responseGetProd = self.client.get('/api/producers/1/')
#         productor = json.loads(responseGetProd.content)
#         self.assertEqual(productor["name"], 'Camilo')
