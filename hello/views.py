import json
from itertools import product
from time import strftime, gmtime
import time
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

#from .models import Greeting

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.core import serializers
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework import mixins
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .services import *

from gettingstarted import settings
from .models import *
from .serializers import UserSerializer
from .serializers import ProductSerializer
from .serializers import ProductBasketSerializer
from .serializers import BasketSerializer

from .serializers import CooperativeSerializer
from .serializers import CategorySerializer
from .serializers import ProducerSerializer
from .serializers import OrdersSerializer, CitySerializer, TypeSerializer
from .serializers import ShoppingCarSerializer, OrderStatusSerializer


def index(request):
    return render(request, 'index.html')


def catalogue(request):
    return render(request, 'catalogue.html')


def baskets(request):
    return render(request, 'baskets.html')


def basketsAdmin(request):
    return render(request, 'basketsAdmin.html')


def producers_list(request):
    return render(request, 'producer/listProducer.html')


def regProducer(request):
    return render(request, 'producer/regProducer.html')


def mapProducer(request):
    return render(request, 'producer/mapProducer.html')


def regProducts(request):
    return render(request, 'products/regProducts.html')


def production(request):
    return render(request, 'production.html')


def addProduction(request):
    return render(request, 'addProduction.html')

def regProductsWeek(request):
    return render(request, 'products/regProductsWeek.html')


def indexOrdersAdmin(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'Admin/Orders/index.html')


def productor_detail(request, producer_id):
    # return HttpResponse('Hello from Python!')
    return render(request, 'producer_catalogue.html', {'producer_id': producer_id})


def productor_edit(request, producer_id):
    # return HttpResponse('Hello from Python!')
    return render(request, 'EditProducerAdmin.html', {'producer_id': producer_id})


def cooperativas(request):
    return render(request, 'cooperatives.html')


class CitiesViewSet(viewsets.ModelViewSet):
    """
    List all cities, or create a new city.
    """
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CooperativesViewSet(viewsets.ModelViewSet):
    """
    List all cooperatives, or create a new product.
    """
    queryset = Cooperative.objects.all()
    serializer_class = CooperativeSerializer
    permission_classes = (permissions.AllowAny,)


@csrf_exempt
def updateOrder(request):
    if request.method == 'POST':
        jsonOrder = json.loads(request.body)
        order = Order.objects.filter(id=jsonOrder['id']).update(
            # statusDate = jsonOrder['statusDate'],
            user=jsonOrder['user'], status=jsonOrder['status'],
            schedule=jsonOrder['schedule'], paymentMethod=jsonOrder['paymentMethod'], shoppingCart=jsonOrder['shoppingCart'])
        return HttpResponse("Orden Actualizada")


@csrf_exempt
def addPaymentMethod(request):

    if request.method == 'POST':
        try:

            paymentMethod = PaymentMethod()
            paymentMethod.token = request.POST.get('cardNumber')
            paymentMethod.displayName = request.user.first_name + ' ' + request.user.last_name
            paymentMethod.createdDate = strftime("%Y-%m-%d", gmtime())
            paymentMethod.user = User.objects.get(id=request.user.id)

            paymentMethod.save()

            return JsonResponse({'message': 'Done'})

        except Exception as e:

            return JsonResponse({'Error': e.message})
    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


@csrf_exempt
def registro(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        username = jsonUser['username']
        first_name = jsonUser['name']
        last_name = jsonUser['lastname']
        password = jsonUser['pass1']
        password2 = jsonUser['pass2']
        email = jsonUser['email']

        auxUser = User.objects.filter(username=username)

        if not password == password2:
            return HttpResponse('{"Success": false,"message":"Las contrasenas son diferentes"}')
        elif auxUser:
            return HttpResponse('{"Success": false,"message":"El usuario ya existe"}')
        else:
            user_model = User.objects.create_user(
                username=username, password=password)
            user_model.first_name = first_name
            user_model.last_name = last_name
            user_model.email = email
            user_model.save()
            return HttpResponse('{"Success": true,"message":"Usuario creado"}')


def regUser(request):
    return render(request, 'user/register.html')


def sendEmail(request):

    if request.method == 'GET':

        try:
            email = request.GET.get('email')
            option = request.GET.get('option')

            from_email = settings.EMAIL_HOST_USER
            to_list = [email, settings.EMAIL_HOST_USER]

            if option == '1':
                subject = "Su pedido ha sido pagado"
                status = "Pedido pagado"
                msg = "Su pedido  ha sido pagado y sera despachado a la direccion de entrega especificada."
                message = render_to_string(
                    'emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '2':
                subject = "Su pedido ha sido despachado"
                status = "Pedido despachado"
                msg = "Su pedido  ha sido despachado a la direccion de entrega especificada."
                message = render_to_string(
                    'emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '3':
                subject = "Su pedido ha sido confirmado"
                status = "Pedido confirmado"
                msg = "Su pedido  ha sido confirmado."
                message = render_to_string(
                    'emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '4':
                subject = "Su Pedido ha sido cancelado"
                status = "Pedido Cancelado"
                msg = "Su pedido  ha sido cancelado, esperamos que vuelvas a comprar con nosotros."
                message = render_to_string(
                    'emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '5':
                subject = "Su Pedido ha sido entregado"
                status = "Pedido entregado"
                msg = "Su pedido  ha sido entregado en la  direccion de entrega especificada."
                message = render_to_string(
                    'emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            else:
                msg = 'Specify a valid code.'
                return JsonResponse({'message': msg})

            send_mail(subject, message, from_email, to_list,
                      fail_silently=True, html_message=message)
            msg = 'Email Sent'

            return JsonResponse({'message': msg})

        except Exception as e:

            return JsonResponse({'Error': e.message})

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


class UserViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    """
    List all products, or create a new product.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class ProductViewset(viewsets.ModelViewSet):
    """
    List all products, or create a new product.
    """
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def retrieve(self, request, pk=None):
        queryset = Product.objects.filter(active=True)
        product = get_object_or_404(queryset, pk=pk)
        print(product.__dict__)
        product.isBasket = Basket.objects.filter(product_id=product.id).count() > 0
        print(product.__dict__)
        serializer = ProductBasketSerializer(product)

        return Response(serializer.data)

    def list(self, request):
        products = Product.objects.all()

        for item in products:
            item.isBasket = Basket.objects.filter(product_id=item.id).count() > 0
            print(item.__dict__)
        serializer = ProductBasketSerializer(products, many=True)

        return Response(serializer.data)


class TypeViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    """
    List all products, or create a new product.
    """
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CategoryViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,):
    """
    List all Categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class BasketViewset(viewsets.ModelViewSet):
    """
    List all Baskets.
    """
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        product= Product(
            name=request.data['name'],
            description=request.data['description'],
            unit='Unidad',
            quantity=10,
            price=request.data['price'],
            image='https://sf.tac-cdn.net/images/products/large/SF-870.jpg',
            category=Category(id=1),
            producer=Producer(id=1),
            type=Type(id=1),
            active=request.data['active'],
        )

        product.save()

        basket = Basket(
                name=product.name,
                price=product.price,
                description=product.description,
                active=product.active,
                product=product,
        )
        basket.save()


        current_date = strftime("%Y-%m-%d", gmtime())
        week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()

        week_stock = WeekStock(
            weekSettings= week_settings,
            product = product,
            totalStock = 10,
            maxValue = product.price,
            avgValue = product.price,
            minValue = product.price,
        )

        week_stock.save()
        bio_type = Type.objects.get(shortName='B')

        product_stock= ProductStock(
            weekStock= week_stock,
            producer = product.producer,
            Type = bio_type,
            quantity = 10,
            price = product.price,
        )

        product_stock.save()

        return JsonResponse({'status': '200'})

    def destroy(self, request, pk=None):
        basket = Basket.objects.get(id=pk)
        if basket.product:
            basketProduct = Product.objects.get(
                id=basket.product.id
            )
            basketProduct.delete()
        else:
            basket.delete()

        return JsonResponse({'status': '200'})


class ProducerViewset(viewsets.ModelViewSet):
    """
    List all Producers.
    """
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer
    permission_classes = (permissions.AllowAny,)


def checkOut(request):
    time.sleep(2.5)
    shoppingCart = ShoppingCart.objects.filter(
        user_id=request.user.id, active=True)

    if len(shoppingCart) > 0:

            items = Item.objects.filter(shoppingCart_id=shoppingCart[len(shoppingCart)-1])
            price_array = []
            item_ids = []
            total = 0
            for item in items:
                price_by_item = calculateProductPrice(item.product.id, item.quantityOrganic, item.quantityBio, item.quantityClean, item.quantityGeneral)
                price_array.append(price_by_item)
                #total = total + price_by_item
                total = total + item.totalPrice
                item_ids.append(str(item.id))

            payment_methods = PaymentMethod.objects.filter(user_id=request.user.id, active=True)
            item_ids_str = ' '.join(item_ids)
            return render(request, 'checkout.html', context={'flag': True, 'prices': price_array, 'items': items, 'total': total, 'methods': payment_methods, 'id_shopping': shoppingCart[len(shoppingCart)-1].id, 'ids': item_ids_str})

    else:

        return render(request, 'checkout.html', context={'flag': False})


@csrf_exempt
def checkOutPersist(request):

    if request.method == 'POST':

        name = request.POST.get('name')
        lastName = request.POST.get('lastName')
        address = request.POST.get('address')
        zip = request.POST.get('zip')
        details = request.POST.get('details')
        cardNumber = request.POST.get('cardNumber')
        id_s = request.POST.get('id_s')
        new_card_number = ''
        item_ids = request.POST.get('item_ids')

        if request.POST.get('newMethod') == "0":

            for index in range(len(cardNumber)):
                if index == (len(cardNumber) - 1):
                    new_card_number = new_card_number + cardNumber[index]
                else:
                    new_card_number = new_card_number + '*'

            paymentMethod = PaymentMethod()
            paymentMethod.token = new_card_number
            paymentMethod.displayName = name + ' ' + lastName
            paymentMethod.createdDate = strftime("%Y-%m-%d", gmtime())
            paymentMethod.user = User.objects.get(id=request.user.id)

            paymentMethod.save()

        addressInformation = Address()
        addressInformation.address = address
        addressInformation.detail = details
        addressInformation.latitude = 0.0
        addressInformation.longitude = 0.0
        addressInformation.zipCode = zip
        addressInformation.user = User.objects.get(id=request.user.id)

        addressInformation.save()

        shoppingCart = ShoppingCart.objects.get(id=id_s)
        shoppingCart.active = False
        shoppingCart.save()

        order = Order()
        order.createdDate = strftime("%Y-%m-%d", gmtime())
        order.statusDate = strftime("%Y-%m-%d", gmtime())
        order.paymentMethod = PaymentMethod.objects.latest('id')
        order.schedule = ScheduleOptions.objects.get(id=1)
        order.shoppingCart = shoppingCart
        order.status = OrderStatus.objects.get(id=1)
        order.user = User.objects.get(id=request.user.id)
        order.save()

        # FUNCTION PRODUCERS STOCK
        updateStock(request.POST.get('item_ids'))

        return JsonResponse({'message': request.POST.get('newMethod')})

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


def paymentMethods(request):

    payment_methods = PaymentMethod.objects.filter(
        user_id=request.user.id, active=True)

    if len(payment_methods) != 0:
        return render(request, 'payment_methods.html', context={'flag': True, 'methods': payment_methods})
    else:
        return render(request, 'payment_methods.html', context={'flag': False, 'methods': payment_methods})


@csrf_exempt
def removePaymentMethods(request):

    if request.method == 'POST':

        payment_method = PaymentMethod.objects.get(id=request.POST.get('id'))
        payment_method.active = False
        payment_method.save()

        return JsonResponse({'message': 'Done'})

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


class ProducerList(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProducerSerializer
    queryset = Producer.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('city',)


class ProducerDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'producers': reverse('producer-list', request=request, format=format),
    })


def indexOrders(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'Orders/index.html')


class OrdersViewSet(viewsets.ModelViewSet):
    """
     API endpoint that allows Products to be viewed or edited.
     """
    queryset = Order.objects.all()
    serializer_class = OrdersSerializer


class OrderStatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer


class ShoppingCarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCarSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        # print user
        # print self.request.user.is_staff
        # print self.request.user.is_superuser
        if not self.request.user.is_superuser:
            return ShoppingCart.objects.filter(user=user)
        else:
            return ShoppingCart.objects.all()


@csrf_exempt
def shoppingCartPersist(request):

    user = request.user
    authenticated = user.is_authenticated()
    if request.method == 'POST':
        try:
            if not authenticated:
                return JsonResponse(
                    {'message': 'Por favor inicie sesion para continuar',
                     'authenticated': False}
                )
            items = json.loads(request.POST.get('items'))

            shoppingCart = ShoppingCart(user=user)
            shoppingCart.value = request.POST.get('cartTotal')
            shoppingCart.active = True
            shoppingCart.save()

            totalShoppingCart = 0
            for item in items['items']:
                product = Product.objects.filter(id=item['id']).first()
                total_general = int(
                    item['quantity']) - int(item['organic']) - int(item['bio']) - int(item['clean'])
                total_quantity = (
                    total_general + int(item['organic']) + int(item['bio']) + int(item['clean']))
                cartItem = Item(
                    product=product,
                    quantityOrganic=item['organic'],
                    quantityBio=item['bio'],
                    quantityClean=item['clean'],
                    quantityGeneral=str(total_general),
                    quantityTotal=str(total_quantity),
                    availability=True,
                    totalPrice=total_quantity * product.price,
                    shoppingCart=shoppingCart,
                    addedDate=strftime("%Y-%m-%d", gmtime()),
                )

                totalShoppingCart = totalShoppingCart + cartItem.totalPrice
                cartItem.save()
            shoppingCart.value = totalShoppingCart
            shoppingCart.save()

            return JsonResponse({'message': '', 'authenticated': authenticated})

        except Exception as e:
            return JsonResponse({'message': e})
    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg, 'authenticated': authenticated})


@csrf_exempt
def login_logic(request):
    if request.method == 'POST':

        user = authenticate(username=request.POST.get(
            'username'), password=request.POST.get('password'))

        if (user is not None):
            if user.is_active:
                login(request, user)
                message = "ok"
            else:
                message = "Usuario Inactivo"
        else:
            message = "Nombre de usuario o clave incorrecta"

    return JsonResponse({'message': message})


def login_view(request):
    return render(request, 'login.html')


@csrf_exempt
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


def myProducts(request):
    return render(request, 'products/my_products.html')


@csrf_exempt
def updateProductActive(request):
    if request.method == 'POST':
        jsonProduct = json.loads(request.body)
        product = Product.objects.filter(id=jsonProduct['id']).update(
            active=jsonProduct['active'])
        return HttpResponse("Oferta del producto actualizada!")


@csrf_exempt
def updateProductActive(request):
    if request.method == 'POST':
        jsonProduct = json.loads(request.body)
        product = Product.objects.filter(id=jsonProduct['id']).update(
            active=jsonProduct['active'])
        return HttpResponse("Oferta del producto actualizada!")


@csrf_exempt
def updateProduct(request):
    if request.method == 'POST':
        jsonProduct = json.loads(request.body)
        product = Product.objects.filter(id=jsonProduct['id']).update(
            name=jsonProduct['name'],
            image=jsonProduct['image'],
            description=jsonProduct['description'],
            unit=jsonProduct['unit'],
            price=jsonProduct['price'],
            quantity=jsonProduct['quantity'],
            type=jsonProduct['type'])
        return HttpResponse("Producto actualizada!")


def updateProductView(request):
    return render(request, 'products/updateProduct.html')


def list_products_basket_view(request):

    baskets = Basket.objects.all()

    return render(request, 'ListBasketsAdmin.html', context={'baskets': baskets})


def edit_products_basket_view(request):

    basket = Basket.objects.get(id=request.GET.get('value'))
    itemsPerBasket = ItemsPerBasket.objects.filter(
        basket=basket.id, active=True)
    #aca
    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()
    week_stock = WeekStock.objects.filter(weekSettings=week_settings)
    products=[]

    for week_stock_unit in week_stock:
        product = Product.objects.get(id=week_stock_unit.product.id)
        if(product.unit != 'Unidad'):
            products.append(product)


    jsonProducts = []
    for item in itemsPerBasket:
        jsonProducts.append(
            {"idProduct": item.product.id, "quantity": item.quantity})


    return render(request, 'EditBasketsAdmin.html', context={'basket': basket, 'items': itemsPerBasket, 'products': products, 'range': '10', 'prices': getEstimatePriceService(jsonProducts)})


@csrf_exempt
def add_item_basket(request):

    id_basket = request.POST.get('id_basket')
    id_product = request.POST.get('id_product')
    quantity = request.POST.get('quantity')

    return JsonResponse({'message': add_item_basket_service(id_basket, id_product, quantity)})


@csrf_exempt
def remove_item_basket(request):

    id_basket = request.POST.get('id_basket')
    id_item = request.POST.get('id_item')

    basket = Basket.objects.get(id=id_basket)
    item = ItemsPerBasket.objects.get(id=id_item, basket=basket.id)

    item.active = False
    item.save()

    return JsonResponse({'message': 'Done'})


@csrf_exempt
def remove_item_catalogue_view(request):

    products = Product.objects.all()

    return render(request, 'EditCatalogueAdmin.html', context={'products': products})


@csrf_exempt
def remove_product_logic(request):

    product = Product.objects.get(id=request.POST.get('product'))

    if request.POST.get('value') == "0":
        product.active = False
    else:
        product.active = True

    product.save()

    return JsonResponse({'message': 'Done'})


@csrf_exempt
def product_price_logic(request):

    if request.POST.get("bio"):
        if request.POST.get("bio") != 0:
            quantity_bio = float(request.POST.get("bio"))
        else:
            quantity_bio = 0.0
        if request.POST.get("organic") != 0:
            quantity_org = float(request.POST.get("organic"))
        else:
            quantity_org = 0.0
        if request.POST.get("clean") != 0:
            quantity_clean = float(request.POST.get("clean"))
        else:
            quantity_clean = 0.0

        quantity_general = 0.0
        id = request.POST.get("id")

    else:
        quantity_bio = float(request.POST.get("item[bio]"))
        quantity_org = float(request.POST.get("item[organic]"))
        quantity_clean = float(request.POST.get("item[clean]"))
        quantity_general = (float(request.POST.get(
            "item[quantity]"))) - quantity_bio - quantity_clean - quantity_org
        id = request.POST.get("item[id]")

    price = calculateProductPrice(
        id, quantity_org, quantity_bio, quantity_clean, quantity_general)

    return JsonResponse({'message': 'Done', 'price': price})


@csrf_exempt
def validate_advance_purchase(request):

    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(
        start__lte=current_date, end__gte=current_date)[:1].get()

    product = Product.objects.get(id=request.POST.get('product_id'))
    week_stock = WeekStock.objects.get(
        product=product, weekSettings=week_settings)

    organic_type = Type.objects.get(shortName='O')
    clean_type = Type.objects.get(shortName='L')
    bio_type = Type.objects.get(shortName='B')

    bio_result = True
    clean_result = True
    organic_result = True
    general_result = True

    if float(request.POST.get('bio')) > 0.0:
        product_stock_bio = ProductStock.objects.filter(
            weekStock=week_stock, Type=bio_type).order_by('price')
        bio_result = stockValidation(
            product_stock_bio, request.POST.get('bio'))
    if float(request.POST.get('clean')) > 0.0:
        product_stock_clean = ProductStock.objects.filter(
            weekStock=week_stock, Type=clean_type).order_by('price')
        clean_result = stockValidation(
            product_stock_clean, request.POST.get('clean'))
    if float(request.POST.get('organic')) > 0.0:
        product_stock_organic = ProductStock.objects.filter(
            weekStock=week_stock, Type=organic_type).order_by('price')
        organic_result = stockValidation(
            product_stock_organic, request.POST.get('organic'))
    if float(request.POST.get('bio')) == 0 and float(request.POST.get('clean')) == 0 and float(request.POST.get('organic')) == 0:
        product_stock_general = ProductStock.objects.filter(
            weekStock=week_stock).order_by('price')
        general_result = stockValidation(
            product_stock_general, request.POST.get('general'))

    return JsonResponse({'message': 'Done', 'bio': bio_result, 'clean': clean_result, 'organic': organic_result, 'general': general_result})


@csrf_exempt
def getEstimatePrice(request):
    if request.method == 'POST':
        jsonProducts = json.loads(request.body)
        return JsonResponse(getEstimatePriceService(jsonProducts))


def updateStock(item_ids):

    ids = item_ids.split(" ")
    for single_id in ids:
        item = Item.objects.get(id=single_id)
        result = calculateProductPrice(item.product.id, item.quantityOrganic, item.quantityBio, item.quantityClean,item.quantityGeneral)
        quantityModification(result)

    return True

def quantityModification(result):
    for index in result:
        if index != 0:
            total = index['total']
            for product_stock_id in index['product_list']:
                product_stock = ProductStock.objects.get(id=product_stock_id)
                product_stock.quantity = product_stock.quantity - 1
                product_stock.save()

                weekStock = WeekStock.objects.get(id=product_stock.weekStock.id)
                weekStock.totalStock = weekStock.totalStock - 1
                weekStock.save()


@csrf_exempt
def stockStatistics(request):

    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()
    week_stock = WeekStock.objects.filter(weekSettings=week_settings)
    result =[]
    for item in week_stock:
        product_stock = ProductStock.objects.filter(weekStock=item.id)
        for item_stock in product_stock:
            result.append(item_stock)

    return render(request, 'ListStockAdmin.html', context={'stock': result})


def get_week_products(request):
    return JsonResponse({'message': getWeekProductsService()})

def get_week_products_name(request):
    return JsonResponse({'message': getWeekProductsNameService()})

@csrf_exempt
def createProducer(request):
    if request.method == 'POST':
        jsonProducer = json.loads(request.body)
        username = jsonProducer["username"]
        password = jsonProducer["password1"]
        email = jsonProducer["email"]

        userCreated = User.objects.create_user(username=username, password=password, email=email, is_active=False)

        User.save(userCreated)

        coop = Cooperative.objects.get(id=jsonProducer["cooperative"])

        productor_model = Producer()

        productor_model.user = User.objects.last()
        productor_model.active = jsonProducer["active"]
        productor_model.address = jsonProducer["address"]
        productor_model.city = jsonProducer["city"]
        productor_model.name = jsonProducer["name"]
        productor_model.cooperative = coop
        productor_model.description = jsonProducer["description"]
        productor_model.identificationNumber = jsonProducer["identificationNumber"]
        productor_model.image = jsonProducer["image"]
        productor_model.is_producer = jsonProducer["is_producer"]
        productor_model.latitude = jsonProducer["latitude"]
        productor_model.longitude = jsonProducer["longitude"]
        productor_model.phoneNumber = jsonProducer["phoneNumber"]
        productor_model.typeIdentification = jsonProducer["typeIdentification"]

        Producer.save(productor_model)

        return JsonResponse ({'status': 200})

@csrf_exempt
def createProduct(request):
    if request.method == 'POST':
        jsonProduct = json.loads(request.body)
        name = jsonProduct["name"]
        description = jsonProduct["description"]
        image = jsonProduct["image"]
        unit = jsonProduct["unit"]
        quantity = jsonProduct["quantity"]
        price = jsonProduct["price"]
        type = Type.objects.get(id=jsonProduct["type"])
        category = Category.objects.get(id=jsonProduct["category"])
        producer = Producer.objects.get(id=jsonProduct["producer"])
        active =jsonProduct["active"]

        product = Product(name = name,
            active = active,
            image = image,
            description = description,
            producer = producer,
            unit = unit,
            quantity =quantity,
            price = price,
            category = category,
            type = type
        )

        Product.save(product)

        productCreated =Product.objects.last()

        addWeekNewProductsService(productCreated)

        return JsonResponse ({'status': 200})

@csrf_exempt
def updateProductStock(request):
    if request.method == 'POST':
        jsonProduct = json.loads(request.body)
        id = jsonProduct["id"]
        quantity = jsonProduct["quantity"]
        price = jsonProduct["price"]
        type = jsonProduct["type"]
        producer = jsonProduct["producer"]

        print(producer)

        current_date = strftime("%Y-%m-%d", gmtime())
        week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()

        weekStock = WeekStock.objects.get(product=id,weekSettings=week_settings)
        #producerFinal = Producer.objects.get(id=id)
        typeFinal = Type.objects.get(id=type),
        print(weekStock)

        if weekStock:
            weekStock.totalStock = weekStock.totalStock+float(quantity);

            if float(price)>weekStock.maxValue:
                weekStock.maxValue=float(price);
            elif float(price)<weekStock.minValue:
                weekStock.minValue = float(price);

            weekStock.avgValue = (weekStock.maxValue + weekStock.minValue)/2;

            WeekStock.save(weekStock)
        try:
            productStock = ProductStock.objects.get(Type=type,weekStock=weekStock,producer=producer)
        except ProductStock.DoesNotExist:
            productStock = None

        if productStock is not None:
            productStock.quantity = productStock.quantity + float(quantity)
            productStock.price = float(price)
            ProductStock.save(productStock)
        else:
            productStockNew = ProductStock(
                weekStock = weekStock,
                producer = Producer.objects.get(id=producer),
                Type = Type.objects.get(id=type),
                price = float(price),
                quantity = float(quantity)
            )
            ProductStock.save(productStockNew)



    return JsonResponse({'status': 200})