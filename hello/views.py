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
                status = "Pedido pagado"
                msg = "Su pedido  ha sido pagado y sera despachado a la direccion de entrega especificada."
                message = render_to_string('payed.html', {'email': email, 'status': status, 'msg': msg})

            elif option == '2':
                subject = "Su pedido ha sido despachado"
                status = "Pedido despachado"
                message = render_to_string('payed.html', {'email': email, 'status': status})

            elif option == '3':
                subject = "Su pedido ha sido confirmado"
                status = "Pedido confirmado"
                message = render_to_string('payed.html', {'email': email, 'status': status})

            elif option == '4':
                subject = "Su Pedido ha sido cancelado"
                status = "Pedido Cancelado"
                message = render_to_string('payed.html', {'email': email, 'status': status})

            elif option == '5':
                subject = "Su Pedido ha sido entregado"
                status = "Pedido entregado"
                message = render_to_string('payed.html', {'email': email, 'status': status})

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
