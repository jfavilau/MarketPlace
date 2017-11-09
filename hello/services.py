from .models import *
# Services s.


def add_item_basket_service(id_basket, id_product, quantity):

    if id_basket and id_product and quantity:
        basket = Basket.objects.get(id=id_basket)
        product = Product.objects.get(id=id_product)

        basket_item = ItemsPerBasket()
        basket_item.basket = basket
        basket_item.product = product
        basket_item.quantity = quantity
        basket_item.active = True
        basket_item.save()

        return True
    else:
        return False

# Servicio para activar productores
def activate_producers_service(producerIds, status):

    result = Producer.objects.all().filter(
        pk__in=producerIds
    ).update(
        active=status
    )

    return result > 0
