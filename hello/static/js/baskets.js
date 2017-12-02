/*jQuery*/

(function($) {
  // USE STRICT
  "use strict";

  var baskets;

  var baseURL = window.location.origin + '/';

  $(window).on('load', function() {
    downloadBaskets();
  });

  function downloadBaskets() {

    $.getJSON(baseURL + "api/baskets/").done(function(data) {

      console.log("Baskets", data);

      baskets = data;

      $.each(baskets, function(i, item) {

        var myvar = '<li>' +
                        '<a href=\"#\" id=\"basket' + i +'\">' + item.name + '</a>' +
                        '<span class=\"totals\">($' + item.price + ')</span>' +
                    '</li>';

        $( "#basket-names-list" ).append(myvar);
        $( "#basket" + i).click(function() {
            selectBasket(i);
        });
      });
      var url = window.location.href
        if(url.indexOf('?') > -1){
            selectBasket('0')
        }
    });
  }

  function selectBasket(pos) {
    console.log("Select Basket: " + pos);

        var basket = baskets[pos];

        $("#basket_name").text(basket.name);
        $("#basket_description").text(basket.description);

        var productsHTML = "";

        $.each(basket.items, function(i, item) {

            productsHTML += '<div class="col-md-4 col-sm-6 product-1 miso-prd-holder">' +
                                    '<div class=\"miso-prd-id\">' + item.product.id + '</div>' +
                                    '<div class=\"miso-prd-qty\"></div>' +
                                    '<div class=\"miso-prd-total\" >' + item.product.quantity + '</div>' +
                                    '<div class=\"thumbnail product-image\" style=\"text-align:center;\">' +

                                      '<div class=\"image-holder\">' +
                                        '<img src="'+ item.product.image +'" alt="' + item.product.name +'" style=\"height:180px; width:180px;\">' +
                                      '</div>' +

                                      '<div class="product-content">'+
                                        '<h3 class="title">'+
                                            '<a class="name" href="product-details-1.html">' + item.product.name +'</a>'+
                                        '</h3>'+
                                        '<p class="price">' + item.quantity + ' unidades' +'</p>'+
                                      '</div>'+
                                    '</div>' +
                                '</div>';

        });

        $( "#baskets_list" ).html( productsHTML );

        setupBasketActions(basket);
  }

  function setupBasketActions(basket) {

     $( "#basket-actions" ).show();
     $( "#basket-total" ).text("TOTAL: $" + basket.price);
     $( "#basket-button" ).click(function() {
        console.log("Add basket to cart HERE!");
     });

  }

})(jQuery);
