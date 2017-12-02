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
    var id_s = $(this).data('ids');
    validateInformation(url_checkout,url_email,user_email,id_s);
  });

  function validateInformation(url_checkout,url_email,user_email,id_s) {
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
    var item_ids = $("#products_ids").data('ids');

        if (jQuery.type(name) == 'string' && jQuery.type(details) == 'string' && jQuery.type(lastName) == 'string' && jQuery.type(address) == 'string' && jQuery.type(country) == 'string' &&
          jQuery.type(department) == 'string' && $.isNumeric(zip) && $.isNumeric(phone) && name != "" && lastName != "" && address != "" && country != "" &&
          department != "" && zip != "" && phone != "" && email != "" && ((card_number != "" && exp_date != "" && code != "") || (atLeastOneIsChecked == 1))) {
              if((!validateNumber(cardNumber) || !validateNumber(code) || !validateDate(expDate)) && atLeastOneIsChecked == 0){
                $("#modalButton").click();
              }
              else{
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
                      "newMethod": atLeastOneIsChecked,
                      "id_s": id_s,
                      "item_ids": item_ids,
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

              }

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

  function validateNumber(number){
    if(number.match("^[0-9]*$"))
       return true;
    else
       return false;
  }

  function validateDate(str){
      var array = str.toString().split('/');
      console.log(str);
      /*console.log(array[0]);
      console.log(array[1]);*/

      if(array.length == 2){
        if (validateNumber(array[0]) && validateNumber(array[1])){
            return true;
        }
        else
            return false;
      }
      else
        return false;


  }

})(jQuery);
