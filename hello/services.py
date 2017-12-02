from time import strftime, gmtime

from .models import *
import math
import locale


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
        total_general = calculateTotalByType(generalQuantity, product_stock_general)

    if organic != 0 or bio != 0 or clean != 0:

        organic_type = Type.objects.get(shortName='O')
        clean_type = Type.objects.get(shortName='L')
        bio_type = Type.objects.get(shortName='B')

        if organic > 0:
            product_stock_org = ProductStock.objects.filter(weekStock=week_stock, Type=organic_type).order_by('price')
            total_organic = calculateTotalByType(organic, product_stock_org)
            #print (calculateTotalByType(organic, product_stock_org))['product_list']

        if bio > 0:
            product_stock_bio = ProductStock.objects.filter(weekStock=week_stock, Type=bio_type).order_by('price')
            total_bio = calculateTotalByType(bio, product_stock_bio)

        if clean > 0:
            product_stock_clean = ProductStock.objects.filter(weekStock=week_stock, Type=clean_type).order_by('price')
            total_clean = calculateTotalByType(clean, product_stock_clean)

    result = []
    result.append(total_organic)
    result.append(total_bio)
    result.append(total_clean)
    result.append(total_general)

    return result


def calculateTotalByType(quantity, prices):

    item_price_list= []
    result = []
    total = 0

    for item in prices:
        for x in range(0, int(item.quantity)):
            tuple_item = [item.id, item.price]
            item_price_list.append(tuple_item)

    decimal_part = math.modf(quantity)

    for x in range(0, int(decimal_part[1])):
        total = total + item_price_list[x][1]
        result.append(item_price_list[x][0])

    result = {'total': total, 'product_list': result}

    return result


def stockValidation(items, quantity):

    result = False
    total_stock = 0.0
    for item in items:
        total_stock = total_stock + item.quantity


    if float(quantity) <= total_stock:
        result = True

    return result

def getEstimatePriceService(jsonProducts):
    # se obtiene la semana actual
    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()
    # Se obtienen los IDs de los productos con sus cantidades
    #jsonProducts = json.loads(request.body)
    estimatePrice = 0
    # print jsonProducts
    for item in jsonProducts:
        # print item["idProduct"]
        product = Product.objects.get(id=item["idProduct"])
        week_stock = WeekStock.objects.get(product=product, weekSettings=week_settings)
        estimatePrice = estimatePrice + week_stock.avgValue * int(item["quantity"])


    result = {'message': 'Done', 'estimatePrice': estimatePrice}
    return result

def getWeekProductsService():
    # se obtiene la semana actual
    current_date = strftime("%Y-%m-%d", gmtime())
    week_settings = WeekSettings.objects.filter(start__lte=current_date, end__gte=current_date)[:1].get()
    # Se obtienen los IDs de los productos con sus cantidades
    # print jsonProducts
    week_stock = WeekStock.objects.filter(totalStock__gt=0, weekSettings=week_settings)
    result_list = list(week_stock.values('product'))
    #print (result_list)
    result = {'WeeklyProducts': result_list}
    return result