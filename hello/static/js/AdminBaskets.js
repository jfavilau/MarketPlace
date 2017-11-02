/*jQuery*/

(function($) {
  // USE STRICT
  "use strict";

  var baseURL = window.location.origin + '/';

  $(window).on('load', function() {
    // Hide loader
    $('.page-loader').fadeOut('slow', function() {
      $(this).remove();
    });
  });

  $(".basket-edit").click(function(){
    window.location = $(this).data('url');

  });

  $("#add_btn").click(function(){
     var url = $(this).data('url');
     var basket = $(this).data('basket');
     var product = $( "#sel1" ).val();
     var quantity = $( "#ex1" ).val();

     if(validateNumber(quantity)){
         $.ajax({
            url: url,
            type: "POST",
            data: {
              "id_basket": basket,
              "id_product": product,
              "quantity": quantity,
            },
            success: function(data) {
              console.log(data);
              $("#modalPayment").click();

            },
            error: function(xhr) {
              $("#modalButton").click();
            }
          });
      }
      else
       $("#modalButton").click();
  });

  $("#done").click(function(){
    window.location.reload();
  });

  $("#add_btn1").click(function(){
   document.getElementById('add_product').style.display = 'block';
  });

  $(".product-remove").click(function(){
     var url = $(this).data('url');
     var basket = $(this).data('basket');
     var item = $(this).data('item');

         $.ajax({
            url: url,
            type: "POST",
            data: {
              "id_basket": basket,
              "id_item": item,
            },
            success: function(data) {
              window.location.reload();
            },
            error: function(xhr) {
              $("#modalButton").click();
            }
          });

  });



  function validateNumber(number){
    if(number.match("^[0-9]*$"))
       return true;
    else
       return false;
  }

})(jQuery);
