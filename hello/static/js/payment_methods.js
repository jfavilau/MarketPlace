(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
            hideLoader();
            setUp();
    });

    function setUp() {

        var flag = $('#payment_methods').attr("data-flag");


        if(flag == 'True') {
          document.getElementById('payment_methods').style.display = 'block';

        } else {

            var text = '<h4 class="checkout-heading" style="margin-left: 3cm;">No tienes medios de pago asociados!</h4><br>'+
            '<button type="button" style="margin-left: 3cm; margin-bottom: 2cm;" class="btn btn-success btn-sm">Agregar Medio de Pago</button>';

            $( "#payment_methods" ).append( text ).on('click', 'button', function () {
                    enable();
             });;

        }

    }

    function hideLoader() {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
            console.log(flag);

        });
    }


    function enable() {
        document.getElementById('new_method').style.display = 'block';
        document.getElementById('payment_methods').style.display = 'none';
    }

    $("#sub_new").click(function(){
        newPaymentMethod($(this).data('url'));
    });

    $("#list_payment_btn").click(function(){
        document.getElementById('new_method').style.display = 'block';
        document.getElementById('payment_methods').style.display = 'none';
    });

    $(".remove.fa.fa-close").click(function(){
        var id= $(this).data('id');
        var url= $(this).data('url');
        remove(id,url);
    });

    function newPaymentMethod(url_data){

        var cardNumber = document.getElementById('card_number').value
        var expDate = document.getElementById('exp_date').value;
        var code = document.getElementById('code').value;

        if(validateNumber(cardNumber) && validateNumber(code) && validateDate(expDate)){
            if(card_number != ""  && exp_date != ""  && code != ""){

                $.ajax({
                url: url_data,
                type: "POST",
                data: {
                    "cardNumber": cardNumber, "expDate": expDate, "code": code
                },
                success: function (data) {
                    console.log(data.message);
                    $("#modalPayment").click();
                },
                error: function (xhr) {
                    $("#modalButton").click();
                }
                });
            }
            else{
                $("#modalButton").click();
            }
        }
        else{
          $("#modalButton").click();
        }
    }

    function remove(id,url_data){
         $.ajax({
            url: url_data,
            type: "POST",
            data: {
                "id": id,
            },
            success: function (data) {
                window.location.reload();
            },
            error: function (xhr) {
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
