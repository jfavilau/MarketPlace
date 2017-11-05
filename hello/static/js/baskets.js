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

    $("#baskets-table").html("");

    $.getJSON(baseURL + "api/baskets/").done(function(data) {

      console.log("Baskets", data);

      baskets = data;

      $.each(baskets, function(i, item) {

        i++;

        var myvar = '<tr>'+
                    '  <td><a href="#" data-toggle="modal" data-target="#myBasketModal" data-basket="' + item.id +'" data-toggle-tooltip="tooltip" data-placement="top" title="Ver canasta">' + item.name + '</a></td>'+
                    '  <td>$ ' + item.price + '</td>'+
                    '  <td style="text-align:center;"><a id="delete-basket' + i + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a></td>'+
                    '</tr>';

        $("#baskets-table").append(myvar);

        $("#delete-basket" + i).click(() => {
          deleteBasket(i);
        });
      });
    });
  }

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({

    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
      }
    }

  });

  $("#new-basket-form").submit(function() {

    var name = $("#basketName").val();
    var price = $("#basketPrice").val();
    var description = $("#basketDescription").val();
    var active = true; //$("#cooperativeActive").val();

    var request;

    request = $.ajax({
      url: baseURL + "api/baskets/",
      method: "POST",
      data: {
        "name": name,
        "price": price,
        "description": description,
        "active": active
      },
      datatype: "json"
    });

    request.done(function(msg) {
      downloadBaskets();
    });

    request.fail(function(jqXHR, textStatus) {
      alert("ERROR");
      //$("#result").html("Request failed: " + textStatus);
    });

    return false;


  });

  function deleteBasket(basketId) {
    if(confirm('¿Está seguro?') != true) return;

    console.log("Delete the Basket: " + basketId);

    var request;

    request = $.ajax({
      url: baseURL + "api/baskets/" + basketId,
      method: "DELETE",
      datatype: "json"
    });

    request.done(function(msg) {
      downloadBaskets();
    });

    request.fail(function(jqXHR, textStatus) {
      alert("ERROR");
      //$("#result").html("Request failed: " + textStatus);
    });

  }

  /*Product detail*/
    $('#myBasketModal').on('show.bs.modal', function(e) {
      var basket_id = e.relatedTarget.dataset.basket;

      console.log("Selected basket: " + basket_id);

      $(".input-size").val("");

      $.getJSON(baseURL + "api/baskets/" + basket_id).done(function(data) {

        var description = "<p>" + data.description + "</p>" +
                            '<p>Disponible</p>' +
                            '<p>Items: ' + data.items.length + '</p>';

        var products = data.items

        $.each(products, function(i, product) {

            // INDICATORS
            var indicator = "";

            if(i==0) {
                indicator = "<li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\" style=\"background-color:#508d42 !important\"></li>";
            } else {
                indicator = '<li data-target=\"#myCarousel\" data-slide-to=' + i + ' style="background-color:#508d42 !important"></li>';
            }

            $( "#basket-products-indicators" ).append(indicator);

            // SLIDES
            var slide = "";
            var item = "";

            if(i==0) item = "<div class=\"item active\">";
            else item = "<div class=\"item\">";

            slide = item +
                        '<img src=' + product.product.image + ' alt=' + product.product.name + ' height="100%" width="100%">' +
                        "<div class=\"carousel-caption\">" +
                            '<h3>' + product.quantity + '</h3>' +
                            '<p>' + product.product.name + '</p>' +
                        "</div>" +
                    "</div>";

            $( "#basket-products-slides" ).append(slide);

        });

        $( "#basket-detail-name" ).html(data.name);
        $( "#basket-detail-price" ).html( "$" + data.price );
        $( "#basket-detail-description" ).html( description );

      });

    });

})(jQuery);
