import json

from django.core import serializers
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from time import gmtime, strftime
import json

#from .models import Greeting

# Create your views here.
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from gettingstarted import settings
from .models import *
from .serializers import *

def index(request):
    #return HttpResponse('Hello from Python!')
    return render(request, 'index.html')

def indexOrders(request):
    #return HttpResponse('Hello from Python!')
    return render(request, 'Orders/index.html')

def indexOrdersAdmin(request):
    #return HttpResponse('Hello from Python!')
    return render(request, 'Admin/Orders/index.html')

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

@csrf_exempt
def getAllOrderByUser(request): #idUser=None
    order = Order.objects.all()
    #print order
    return HttpResponse(serializers.serialize("json",order))

@csrf_exempt
def updateOrder(request):
    if request.method == 'POST':
        jsonOrder = json.loads(request.body)
        order = Order.objects.filter(id=jsonOrder['id']).update(
            user=jsonOrder['user'], status=jsonOrder['status'], #statusDate = jsonOrder['statusDate'],
            schedule = jsonOrder['schedule'],paymentMethod = jsonOrder['paymentMethod'],shoppingCart = jsonOrder['shoppingCart'])
        return HttpResponse("Orden Actualizada")

class OrdersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = OrdersSerializer
    def get_object(self, pk):
        if self.request.method == 'PUT':
            print pk
            print self.data
            o = Order.objects.get(pk=pk)
            serializer = OrderStatusSerializer(o, data=self.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class ProductViewSet(viewsets.ModelViewSet):
     """
     API endpoint that allows Products to be viewed or edited.
     """
     queryset = Product.objects.all().order_by('-price')
     serializer_class = ProductSerializer

     def products(request, city):
         products_list = Product.objects.filter(cooperative__city__shortName=city)
         return HttpResponse(serializers.serialize("json", ))

class OrderStatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
