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



  $("#done").click(function(){
    window.location.reload();
  });


  $('select').on('change', function() {

      var value= $(this).val();
      var product= $(this).data('product');
      var url = $(this).data('url');


      $.ajax({
            url: url,
            type: "POST",
            data: {
              "value": String(value),
              "product": product,
            },
            success: function(data) {
                $("#modalPayment").click();

            },
            error: function(xhr) {
              $("#modalButton").click();
            }
          });
   });

})(jQuery);
