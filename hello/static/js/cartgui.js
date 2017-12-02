/*
Requires
    jquery
    cartmap.js
    cart-minishopcart.js
*/

$(function() {
  'use strict';

  refreshCartGuiOperation();
  refreshCartGuiPersistance();
});

function refreshCartGuiPersistance() {
  var checkout = $('button.btn-checkout');
  checkout.click(function() {
    var cartmap = new CartMap();
    var cartItems = JSON.stringify(cartmap.items());
    $.post('shoppingCartPersist/', {
        'cartTotal': cartmap.getCartTotal(),
        'items': cartmap.cartItemsToJSON(),
      },
      function(data, status) {
        var authenticated = data.authenticated;
        var message = data.message;
        if (!authenticated || message != '') {
          alert(message);
          return;
        }
      });
  });
}

function refreshCartGuiOperation() {
  var plus = $('div.miso-prd-holder .miso-cart-action .miso-cart-plus');

  var minus = $('div.miso-prd-holder .miso-cart-action .miso-cart-minus');

  var remove = $('div.miso-prd-holder .miso-cart-action .miso-cart-clear');

  var product = $('div.miso-prd-holder');

  var cartmap = new CartMap();
  // cartmap.clearCart();

  var cartgui = $('div.mini-shopcart');

  var miniShopCart = new MiniShopCart(cartmap, cartgui);

  miniShopCart.updateItemsInCartMessage();
  miniShopCart.fillCartContents();

  plus.click(function() {
    var quantity = getControlClassFromParents($(this), '.miso-prd-qty');
    var available = getControlClassFromParents($(this), '.miso-prd-total').text();
    var isBasket = getControlClassFromParents($(this), '.miso-prd-is-basket')
      .text().toLowerCase() === 'true';

    //if (Number(available) <= Number(quantity.text())) return;

    var itemctrl = getControlClassFromParents($(this), '.miso-prd-id');
    var item = itemctrl.text();

    result = validate_advance_purchase(item, 0, 0, 0, Number(quantity.text()))

    if (result["general"]) {
      var name = getControlClassFromParents($(this), '.product-content')
        .find('.name').text();
      var price = getControlClassFromParents($(this), '.product-content')
        .find('.price').text();
      var image = getControlClassFromParents($(this), '.image-holder')
        .find('img').attr('src');

      var cartItem = new CartItem(
        item, name, price, 0, image, isBasket
      );

      cartmap.addItem(item, cartItem);
      miniShopCart.addItem(item);
      setQuantityTextForItemCount(quantity, item);
    }
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

  $("#advance_btn").click(function() {

    if ((validateNumber($("#advance_bio").val()) || validateNumber($("#advance_org").val()) || validateNumber($("#advance_lim").val()))) {
      var bio = ($("#advance_bio").val()) ? $("#advance_bio").val() : 0;
      var clean = ($("#advance_lim").val()) ? $("#advance_lim").val() : 0;
      var organic = ($("#advance_org").val()) ? $("#advance_org").val() : 0;
      var validate = validate_advance_purchase($("#product_info").data('id'), bio, clean, organic);
      if (validate["flag"]) {

        if (bio != 0 || clean != 0 || organic != 0) {
          var total = Number(bio) + Number(organic) + Number(clean);

          var quantity = total;
          var available = 100;
          if (Number(available) <= Number(quantity)) return;


          var item = $("#product_info").data('id');
          var name = $("#product_info").data('name');
          //var price = String($("#product_info").data('price') * quantity)
          var price = "";
          $.ajax({
            async: false,
            url: '/productPrice',
            type: "POST",
            data: {
              "id": item,
              "bio": bio,
              "clean": clean,
              "organic": organic,
            },
            success: function(data) {
              price = String(data.price);
            },
            error: function(xhr) {
              console.log('Error - Calculating Price')
              console.log(xhr)
            }
          });

          var image = $("#product_info").attr("src")

          var cartItem = new CartItem(
            item, name, price, quantity, image
          );

          cartmap.addItemAdvance(item, cartItem, quantity, bio, organic, clean);
          miniShopCart.addItem(item);

          var count = total;
          var quantity = count > 0 ? count : "";
          miniShopCart.updateItemsInCartMessage();

          $('#myModal').modal('hide');
        } else {
          $('#myModal').modal('hide');
        }
      } else {
        var error = '<div class="alert alert-danger">';

        if (validate["bio"] != "") {
          error += '<br><strong>Opps!</strong> La cantidad de producto ' + validate["bio"] + ' no se encuentra disponible.'
        };
        if (validate["clean"] != "") {
          error += '<br><strong>Opps!</strong> La cantidad de producto ' + validate["clean"] + ' no se encuentra disponible.'
        };
        if (validate["organic"] != "") {
          error += '<br><strong>Opps!</strong> La cantidad de producto ' + validate["organic"] + ' no se encuentra disponible.'
        };


        error += '</div>';

        $('#advance_errors').html(error);
        setTimeout(function() {
          $('#advance_errors').html("");
        }, 4000);

      }
    } else {
      $('#myModal').modal('hide');
    }

  });

  function validate_advance_purchase(product_id, bio, clean, organic, general = 0) {

    var flag = true;
    var bio_result = "";
    var clean_result = "";
    var organic_result = "";
    var general_result = true;

    $.ajax({
      async: false,
      url: '/advanceValidation',
      type: "POST",
      data: {
        "product_id": product_id,
        "bio": parseInt(bio),
        "clean": parseInt(clean),
        "organic": parseInt(organic),
        "general": general,
      },
      success: function(data) {
        console.log(data);
        if (!data.bio) {
          flag = false;
          bio_result = "bio"
        }
        if (!data.clean) {
          flag = false;
          clean_result = "agr.limpia"
        }
        if (!data.organic) {
          flag = false;
          organic_result = "organico"
        }
        general_result = data.general
      },
      error: function(xhr) {
        console.log(xhr)
        console.log('Error - Validating Price')
      }
    });
    console.log(flag)
    result = {
      "flag": flag,
      "bio": bio_result,
      "clean": clean_result,
      "organic": organic_result,
      "general": general_result
    }
    return result;
  }

  function validateNumber(number) {
    if (number.match("^[0-9]*$"))
      return true;
    else
      return false;
  }

  return cartmap;
}
