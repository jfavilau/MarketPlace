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

        console.log(flag);

        if(flag == 'True') {
            console.log("Si");
        } else {
            console.log("No");
        }

    }

    function hideLoader() {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
            console.log(flag);
            //enable();
        });
    }

    $

    function enable() {

        var myvar = '<div class="checkout-payment-info" style="margin-left: 3cm;">'+
        '        <h4 class="checkout-heading">Nuevo Medio de Pago</h4>'+
        '        <div class="introduce">'+
        '            <p>Tarjetas de Credito Nueva'+
        ''+
        '                <img src="../static/images/icons/ic-payment-method-01.png" alt="payment"/>'+
        '                <img src="../static/images/icons/ic-payment-method-02.png" alt="payment"/>'+
        '                <img src="../static/images/icons/ic-payment-method-03.png" alt="payment"/>'+
        '                <img src="../static/images/icons/ic-payment-method-04.png" alt="payment"/>'+
        '                <img src="../static/images/icons/ic-payment-method-05.png" alt="payment"/>'+
        '            </p>'+
        ''+
        '        </div>'+
        '        <div class="input-row m-b-15">'+
        '            <div class="input-col-3 p-r-5">'+
        '                <input id="card_number" class="theme-input-text" type="text" placeholder="Numero de Tarjeta"/>'+
        '            </div>'+
        '            <div class="input-col-3 p-l-5 p-r-5">'+
        '                <input id="exp_date" class="theme-input-text" type="text" placeholder="Expira (MM/YY) "/>'+
        '            </div>'+
        '            <div class="input-col-3 p-l-5">'+
        '                <input id="code" class="theme-input-text" type="text" placeholder="Codigo"/>'+
        '            </div>'+
        '        </div>'+
        '        <br>'+
        '        <button type="button" class="btn btn-success btn-sm" onclick="newPaymentMethod()">Guardar</button>'+
        ''+
        '    </div>';

        $( "#new_method" ).append( myvar );
    }

    function newPaymentMethod(){

        cardNumber =$( "#card_number" ).val();
        expDate =$( "#exp_date" ).val();
        code =$( "#code" ).val();

        if(card_number != ""  && exp_date != ""  && code != ""){

            $.ajax({
            url: "{% url 'addPaymentMethod'%}",
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
         console.log('error');
            $("#modalButton").click();
        }
    }

    function remove(id){
         $.ajax({
            url: "{% url 'removePaymentMethods'%}",
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

})(jQuery);
