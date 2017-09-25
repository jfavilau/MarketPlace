from django.core import serializers
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse

#from .models import Greeting

# Create your views here.
from django.shortcuts import render
from django.template.loader import render_to_string

from gettingstarted import settings


def index(request):
    #return HttpResponse('Hello from Python!')
    return render(request, 'index.html')


def sendEmail(request):

    if request.method == 'GET':

        try:
            email = request.GET.get('email')
            option = request.GET.get('option')

            from_email = settings.EMAIL_HOST_USER
            to_list = [email, settings.EMAIL_HOST_USER]

            if option == '1':
                subject = "Su pedido ha sido pagado"
                message = render_to_string('payed.html', {'name': 'erick'})

            elif option == '2':
                subject = "Su pedido ha sido despachado"
                message = "Hola!/n Bienvenida monitora, Gracias por probar nuestra aplicacion"

            elif option == '3':
                subject = "Su pedido ha sido confirmado"
                message = "Hola!/n Bienvenida monitora, Gracias por probar nuestra aplicacion"

            elif option == '4':
                subject = "Su Pedido ha sido cancelado"
                message = "Hola!/n Bienvenida monitora, Gracias por probar nuestra aplicacion"

            elif option == '5':
                subject = "Su Pedido ha sido entregado"
                message = "Hola!/n Bienvenida monitora, Gracias por probar nuestra aplicacion"

            else:
                msg = 'Specify a valid code.'
                return JsonResponse({'message': msg})

            send_mail(subject, message, from_email, to_list, fail_silently=True, html_message=message)
            msg = 'Email Sent'

            return JsonResponse({'message': msg})

        except Exception as e:

            msg = 'Done!'
            return JsonResponse({'Error': e})

    else:

        msg = 'Wrong method specified!'
        return JsonResponse({'message': msg})
