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

from gettingstarted import settings
from .models import *
from .serializers import UserSerializer
from .serializers import ProductSerializer


def index(request):
    return render(request, 'index.html')

@csrf_exempt
def addPaymentMethod(request):

    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode())

            paymentMethod = PaymentMethod()
            paymentMethod.token = body['creditCard']
            paymentMethod.displayName = body['displayName']
            paymentMethod.createdDate = strftime("%Y-%m-%d", gmtime())
            paymentMethod.user = User.objects.get(id=body['id'])

            paymentMethod.save()


            return JsonResponse({'Status': 'Done'})

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

