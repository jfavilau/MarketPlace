/*
Requires
    jquery
    cartmap.js
    cart-minishopcart.js
*/

$(function() {
  'use strict';

  refreshCartGuiOperation()
});

function refreshCartGuiOperation() {
  var plus = $('div.miso-prd-holder .miso-cart-action .miso-cart-plus');

  var minus = $('div.miso-prd-holder .miso-cart-action .miso-cart-minus');

  var remove = $('div.miso-prd-holder .miso-cart-action .miso-cart-clear');

  var product = $('div.miso-prd-holder');

  var cartmap = new CartMap();
  var cartgui = $('div.mini-shopcart');

  var miniShopCart = new MiniShopCart(cartmap, cartgui);

  miniShopCart.updateItemsInCartMessage();
  miniShopCart.fillCartContents();

  plus.click(function() {
    var itemctrl = getControlClassFromParents($(this), '.miso-prd-id');
    var item = itemctrl.text();
    var quantity = getControlClassFromParents($(this), '.miso-prd-qty');
    var name = getControlClassFromParents($(this), '.product-content')
      .find('.name').text();
    var price = getControlClassFromParents($(this), '.product-content')
      .find('.price').text();

    var cartItem = new CartItem(
      item, name, price, 0
    );

    cartmap.addItem(item, cartItem);
    miniShopCart.addItem(item);
    setQuantityTextForItemCount(quantity, item);
  });

  minus.click(function() {
    var itemctrl = getControlClassFromParents($(this), '.miso-prd-id');
    var item = itemctrl.text();
    var quantity = getControlClassFromParents($(this), '.miso-prd-qty');

    cartmap.removeItem(item);
    miniShopCart.removeItem(item);
    setQuantityTextForItemCount(quantity, item)
  });

  remove.click(function() {
    var itemctrl = getControlClassFromParents($(this), '.miso-prd-id');
    var item = itemctrl.text();
    var quantity = getControlClassFromParents($(this), '.miso-prd-qty');

    cartmap.clearItem(item);
    miniShopCart.clearItem(item);
    // quantity.text("");
    setQuantityTextForItemCount(quantity, item)
  });

  product.mouseenter(function() {
    var item = $(this).find('.miso-prd-id').text();
    var quantity = $(this).find('.miso-prd-qty');
    setQuantityTextForItemCount(quantity, item)
  });


  function setQuantityTextForItemCount(quantityctrl, item) {
    var count = cartmap.getItemCount(item);
    quantityctrl.text(count > 0 ? count : "");
    miniShopCart.updateItemsInCartMessage();
  }

  function getControlClassFromParents(current, sonToFind) {
    var parent = current.parent();

    if (parent.attr('class') == undefined) return;

    var son = parent.find(sonToFind);
    if (son != undefined && son.attr('class') != undefined) return son;

    return getControlClassFromParents(parent, sonToFind);

  }

  function getControlClassFromChildren(current, sonToFind) {
    var parent = current.parent();

    if (parent.attr('class') == undefined) return;

    var son = parent.find(sonToFind);
    if (son != undefined && son.attr('class') != undefined) return son;

    return getControlClassFromParents(parent, sonToFind);

  }
}
