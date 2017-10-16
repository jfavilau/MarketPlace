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

  $("#purchase").click(function(){
    var url_checkout = $(this).data('checkout');
    var url_email = $(this).data('email');
    var user_email = $(this).data('user');
    validateInformation(url_checkout,url_email,user_email);
  });

  function validateInformation(url_checkout,url_email,user_email) {
    var name = $("#name").val();
    var lastName = $("#lastName").val();
    var address = $("#address").val();
    var details = $("#details").val();
    var country = $("#country").val();
    var department = $("#dpto").val();
    var zip = $("#zip").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var cardNumber = $("#card_number").val();
    var expDate = $("#exp_date").val();
    var code = $("#code").val();
    var atLeastOneIsChecked = $('input[name=check]:checked').length;

    if (jQuery.type(name) == 'string' && jQuery.type(details) == 'string' && jQuery.type(lastName) == 'string' && jQuery.type(address) == 'string' && jQuery.type(country) == 'string' &&
      jQuery.type(department) == 'string' && $.isNumeric(zip) && $.isNumeric(phone) && name != "" && lastName != "" && address != "" && country != "" &&
      department != "" && zip != "" && phone != "" && email != "" && ((card_number != "" && exp_date != "" && code != "") || (atLeastOneIsChecked == 1))) {

      $.ajax({
        url: url_checkout,
        type: "POST",
        data: {
          "name": name,
          "lastName": lastName,
          "address": address,
          "details": details,
          "country": country,
          "department": department,
          "zip": zip,
          "phone": phone,
          "email": email,
          "cardNumber": cardNumber,
          "expDate": expDate,
          "code": code,
          "newMethod": atLeastOneIsChecked
        },
        success: function(data) {
          console.log(data.message);
          $("#modalPayment").click();
          sendConfirmation(url_email,user_email);
          var cartmap = new CartMap()
          cartmap.clearCart()
        },
        error: function(xhr) {
          $("#modalButton").click();
        }
      });
    } else {
      console.log('error');
      $("#modalButton").click();
    }
  }

  function sendConfirmation(url_email,user_email) {
    $.ajax({
      url: url_email,
      type: "GET",
      data: {
        "option": 1,
        "email": user_email
      },
      success: function(data) {
        console.log(data.message);
      },
      error: function(xhr) {
        console.log(data.message);
      }
    });
  }

})(jQuery);
