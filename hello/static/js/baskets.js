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

    $("#baskets-list").html("");

    $.getJSON(baseURL + "api/baskets/").done(function(data) {

      console.log("Baskets", data);

      baskets = data;

      $.each(baskets, function(i, item) {

        i++;

        var myvar = '<li>' +
          '<p>' +
          ' <a id="delete-basket' + i + '" style="float: left; height:32px; padding-top:8px;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>' +
          '</p>' +
          ' <a href="#">' + item.name + '</a>' +
          ' <p style="float: right;"> $ ' + item.price + '</p>' +
          '</li>';

        $("#baskets-list").append(myvar);

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

})(jQuery);
