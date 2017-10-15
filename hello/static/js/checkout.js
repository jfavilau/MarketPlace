/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    function validateInformation(){
        name =$( "#name" ).val();
        lastName =$( "#lastName" ).val();
        address =$( "#address" ).val();
        details =$( "#details" ).val();
        country =$( "#country" ).val();
        department =$( "#dpto" ).val();
        zip =$( "#zip" ).val();
        phone =$( "#phone" ).val();
        email =$( "#email" ).val();
        cardNumber =$( "#card_number" ).val();
        expDate =$( "#exp_date" ).val();
        code =$( "#code" ).val();
        var atLeastOneIsChecked = $('input[name=check]:checked').length;

        if(jQuery.type( name ) == 'string' && jQuery.type( details ) == 'string' && jQuery.type( lastName ) == 'string' && jQuery.type( address ) == 'string' && jQuery.type( country ) == 'string'
            && jQuery.type( department ) == 'string' &&  $.isNumeric(zip) &&  $.isNumeric(phone) && name != "" && lastName != "" && address != "" && country != ""
            && department != "" && zip != "" && phone != "" && email != "" && ((card_number != ""  && exp_date != ""  && code != "")||(atLeastOneIsChecked == 1))){

            $.ajax({
            url: "{% url 'checkOutPersist'%}",
            type: "POST",
            data: {
                "name": name, "lastName": lastName, "address": address, "details": details ,"country": country, "department": department,
                 "zip": zip, "phone": phone, "email": email, "cardNumber": cardNumber, "expDate": expDate, "code": code, "newMethod": atLeastOneIsChecked
            },
            success: function (data) {
                console.log(data.message);
                $("#modalPayment").click();
                sendConfirmation();
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

    function sendConfirmation(){
        $.ajax({
            url: "{% url 'sendEmail'%}",
            type: "GET",
            data: {
                "option": 1, "email": "{{request.user.email}}"
            },
            success: function (data) {
                console.log(data.message);

            },
            error: function (xhr) {
                console.log(data.message);
            }
         });
    }

})(jQuery);

