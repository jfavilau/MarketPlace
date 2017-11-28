from time import strftime, gmtime

from .models import *
import math


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


def addProductToCart(productId, organic, bio, clean, generalQuantity):

    if generalQuantity > 0:
        calculateProductPrice(productId,0,0,0,generalQuantity)
    else:
        calculateProductPrice(productId, organic, bio, clean, generalQuantity)


def calculateProductPrice(productId, organic, bio, clean, generalQuantity):

    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()

    product = Product.objects.get(id=productId)
    week_stock = WeekStock.objects.get(product=product, weekSettings=week_settings)

    total_organic = 0
    total_bio = 0
    total_clean = 0
    total_general = 0

    if generalQuantity > 0:

        product_stock_general = ProductStock.objects.filter(weekStock=week_stock).order_by('price')
        total_general = (calculateTotalByType(generalQuantity, product_stock_general))['total']

    if organic != 0 or bio != 0 or clean != 0:

        organic_type = Type.objects.get(shortName='O')
        clean_type = Type.objects.get(shortName='L')
        bio_type = Type.objects.get(shortName='B')

        if organic > 0:
            product_stock_org = ProductStock.objects.filter(weekStock=week_stock, Type=organic_type).order_by('price')
            total_organic = (calculateTotalByType(organic, product_stock_org))['total']
            #print (calculateTotalByType(organic, product_stock_org))['product_list']

        if bio > 0:
            product_stock_bio = ProductStock.objects.filter(weekStock=week_stock, Type=bio_type).order_by('price')
            total_bio= (calculateTotalByType(bio, product_stock_bio))['total']

        if clean > 0:
            product_stock_clean = ProductStock.objects.filter(weekStock=week_stock, Type=clean_type).order_by('price')
            total_clean = (calculateTotalByType(clean, product_stock_clean))['total']

    return total_organic + total_bio + total_clean + total_general


def calculateTotalByType(quantity, prices):

    item_price_list= []
    total = 0

    for item in prices:
        for x in range(0, int(item.quantity)):
            tuple_item = [item.id, item.price]
            item_price_list.append(tuple_item)

    decimal_part = math.modf(quantity)

    for x in range(0, int(decimal_part[1])):
        total = total + item_price_list[x][1]

    result = {'total': total, 'product_list': item_price_list}

    return result


def stockValidation(items, quantity):
    #print 'entre';
    result = False
    total_stock = 0.0
    for item in items:
        total_stock = total_stock + item.quantity

    #print total_stock
    #print quantity
    if float(quantity) <= total_stock:
        result = True
    #print result
    return result