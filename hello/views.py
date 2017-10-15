import json
from time import strftime, gmtime

from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse

#from .models import Greeting

# Create your views here.
from django.shortcuts import render
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework import mixins
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse

from gettingstarted import settings
from .models import *
from .serializers import UserSerializer
from .serializers import ProductSerializer
from .serializers import BasketSerializer

from .serializers import CategorySerializer
from .serializers import ProducerSerializer
from .serializers import OrdersSerializer
from .serializers import ShoppingCarSerializer,OrderStatusSerializer


def index(request):
    return render(request, 'index.html')

def catalogue(request):
    return render(request, 'catalogue.html')

def regProducer(request):
    return render(request, 'producer/regProducer.html')

def indexOrdersAdmin(request):
    #return HttpResponse('Hello from Python!')
    return render(request, 'Admin/Orders/index.html')

@csrf_exempt
def updateOrder(request):
    if request.method == 'POST':
        jsonOrder = json.loads(request.body)
        order = Order.objects.filter(id=jsonOrder['id']).update(
            user=jsonOrder['user'], status=jsonOrder['status'], #statusDate = jsonOrder['statusDate'],
            schedule = jsonOrder['schedule'],paymentMethod = jsonOrder['paymentMethod'],shoppingCart = jsonOrder['shoppingCart'])
        return HttpResponse("Orden Actualizada")

@csrf_exempt
def addPaymentMethod(request):

    if request.method == 'POST':
        try:

            paymentMethod = PaymentMethod()
            paymentMethod.token = request.POST.get('cardNumber')
            paymentMethod.displayName = request.user.first_name+' '+request.user.last_name
            paymentMethod.createdDate = strftime("%Y-%m-%d", gmtime())
            paymentMethod.user = User.objects.get(id=request.user.id)

            paymentMethod.save()


            return JsonResponse({'message': 'Done'})

        except Exception as e:

            return JsonResponse({'Error': e.message})
    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


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
                message = render_to_string('emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '2':
                subject = "Su pedido ha sido despachado"
                status = "Pedido despachado"
                msg = "Su pedido  ha sido despachado a la direccion de entrega especificada."
                message = render_to_string('emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '3':
                subject = "Su pedido ha sido confirmado"
                status = "Pedido confirmado"
                msg = "Su pedido  ha sido confirmado."
                message = render_to_string('emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '4':
                subject = "Su Pedido ha sido cancelado"
                status = "Pedido Cancelado"
                msg = "Su pedido  ha sido cancelado, esperamos que vuelvas a comprar con nosotros."
                message = render_to_string('emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '5':
                subject = "Su Pedido ha sido entregado"
                status = "Pedido entregado"
                msg = "Su pedido  ha sido entregado en la  direccion de entrega especificada."
                message = render_to_string('emails/emailTemplate.html', {'email': email, 'status': status, 'msg': msg})

            else:
                msg = 'Specify a valid code.'
                return JsonResponse({'message': msg})

            send_mail(subject, message, from_email, to_list, fail_silently=True, html_message=message)
            msg = 'Email Sent'

            return JsonResponse({'message': msg})

        except Exception as e:

            return JsonResponse({'Error': e.message})

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})


class UserViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    """
    List all products, or create a new product.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProductViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    """
    List all products, or create a new product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class CategoryViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,):
    """
    List all categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class BasketViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,):
    """
    List all baskets.
    """
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


def checkOut(request):

        shoppingCart = ShoppingCart.objects.filter(user_id=request.user.id, active=True)

        if len(shoppingCart) > 0:

            items = Item.objects.filter(shoppingCart_id=shoppingCart[len(shoppingCart)-1])
            payment_methods = PaymentMethod.objects.filter(user_id=request.user.id)

            return render(request, 'checkout.html', context={'flag': True,'items': items,'total': shoppingCart[len(shoppingCart)-1].value, 'methods': payment_methods})

        else:

            return render(request, 'checkout.html',context={'flag': False})

@csrf_exempt
def checkOutPersist(request):

    if request.method == 'POST':

        name = request.POST.get('name')
        lastName = request.POST.get('lastName')
        address = request.POST.get('address')
        zip = request.POST.get('zip')
        details = request.POST.get('details')
        cardNumber = request.POST.get('cardNumber')
        new_card_number = ''


        if request.POST.get('newMethod') == "0":

            for index in range(len(cardNumber)):
                if index == (len(cardNumber) - 1):
                    new_card_number = new_card_number + cardNumber[index]
                else:
                    new_card_number = new_card_number + '*'

            paymentMethod = PaymentMethod()
            paymentMethod.token = new_card_number
            paymentMethod.displayName = name+' '+lastName
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



        return JsonResponse({'message': request.POST.get('newMethod') })

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})

def paymentMethods(request):

    payment_methods = PaymentMethod.objects.filter(user_id=request.user.id, active=True)

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
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer

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
    #return HttpResponse('Hello from Python!')
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
        #print user
        #print self.request.user.is_staff
        #print self.request.user.is_superuser
        if not self.request.user.is_superuser:
            return ShoppingCart.objects.filter(user=user)
        else:
            return ShoppingCart.objects.all()