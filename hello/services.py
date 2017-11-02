from .models import *

def add_item_basket_service(id_basket,id_product,quantity):

    if id_basket:
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