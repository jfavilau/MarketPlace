/*
  Requires cartmap.js
  Requires jquery
*/

function MiniShopCart(cartmap, cartgui) {
  this.cartmap = cartmap;
  this.cartgui = cartgui;
  this.cart_icon_holder = $('.cart-icon-holder .cart-shopping .totals');

  this.updateItemsInCartMessage = updateItemsInCartMessage;
  this.fillCartContents = fillCartContents;

  this.addItem = addItemToCartContents;
  this.removeItem = removeItemFromCartContents;
  this.clearItem = clearItemFromCartContents;
}

function updateItemsInCartMessage() {
  var cartgui = this.cartgui;
  var cartmap = this.cartmap;
  var ciholder = this.cart_icon_holder;

  var msgelem = cartgui.find('.head-mini-shopcart p');
  var itemCount = this.cartmap.getCartCount();
  msgelem.text(itemCount + ' items en tu carro de compras');
  ciholder.text(itemCount);
}

function fillCartContents() {
  var items = this.cartmap.items();
  var content = this.cartgui.find('.content-mini-shopcart');
  var contentItems = '';

  for (item in items) {
    contentItems += buildCartContentItem(items[item], true);
  }

  content.html(contentItems);
}

function addItemToCartContents(itemId) {
  var cartgui = this.cartgui;
  var cartmap = this.cartmap.items();

  var currentItem = cartgui.find('.' + itemId);

  if (currentItem.attr('class') != undefined) {
    var price = currentItem.find('.item-content .price');
    price.html(cartmap[itemId].quantity + ' - $' + cartmap[itemId].price);
    return
  }

  var cartItemContent = cartgui.find('.content-mini-shopcart');
  var newHtml = cartItemContent.html() +
  buildCartContentItem(cartmap[itemId], true);
  cartItemContent.html(newHtml);

}

function removeItemFromCartContents(itemId) {
  var cartgui = this.cartgui;
  var cartmap = this.cartmap.items();
  var currentItem = cartgui.find('.' + itemId);

  if (currentItem.attr('class') == undefined) return;
  if (cartmap[itemId] == undefined ||
    cartmap[itemId].quantity <= 0) {
    currentItem.remove();
    return;
  }

  var price = currentItem.find('.item-content .price');
  price.html(cartmap[itemId].quantity + ' - $' + cartmap[itemId].price);
}

function clearItemFromCartContents(itemId) {
  var cartgui = this.cartgui;
  var cartmap = this.cartmap;
  var currentItem = cartgui.find('.' + itemId);

  if (currentItem == undefined) return;
  currentItem.remove();
}

function buildCartContentItem(item, includeItemDiv) {
  var itemHtml = '';
  console.log(item)
    $.ajax({
      async:false,
      url: '/productPrice',
      type: "POST",
      data: {
        "item": item,
      },
      success: function(data) {
        console.log(0)
        item.price = data.price;
      },
      error: function(xhr) {
        console.log('Error - Calculating Price')
        console.log(xhr)
      }
    });

    console.log(1)
    if (includeItemDiv) itemHtml += '<div class=\"item-mini-shopcart ' + item.id + '\">';
          itemHtml += '\n\t<div class=\"item-image\">';
          itemHtml += '\n\t\t<img style=\"height:50px; width:50px\" src=\"' + item.image + '\" alt=\"' + item.id + '\" />';
          itemHtml += '\n\t</div>';

          itemHtml += '\n\t<div class=\"item-content\">';
          itemHtml += '\n\t<h3 class=\"name\">';
          itemHtml += '\n\t\t' + item.name;
          itemHtml += '\n\t</h3>';
          itemHtml += '\n\t<p class=\"price\">';
          itemHtml += '\n\t\t' + item.quantity + ' - $' + item.price;
          itemHtml += '\n\t</p>';
          itemHtml += '\n\t</div>';

          if (includeItemDiv) itemHtml += '\n</div>\n';

     return itemHtml;
}

