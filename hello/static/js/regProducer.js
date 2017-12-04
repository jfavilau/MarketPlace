/*jQuery*/
(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

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

    function enviarForm() {


        var info = {typeIdentification: $('#typeIdentification').val(),
                    identificationNumber : $('#identificationNumber').val(),
                    image: $('#image').val(),
                    name: $('#name').val(),
                    username: $('#username').val(),
                    password1: $('#password1').val(),
                    email: $('#email').val(),
                    description: $('#description').val(),
                    address: $('#address').val(),
                    city: quitaAcentos($('#city').val().toUpperCase()),
                    latitude: $('#latitude').val(),
                    longitude: $('#longitude').val(),
                    phoneNumber: $('#phoneNumber').val(),
                    cooperative: $('#cooperative').val(),
                    products: $('#products').val(),
                    active: $('#active').val(),
                    is_producer: $('#is_producer').val()
                    };

        $.ajax({
            type: "POST",
            url: "{% url 'producers-create' %}",
            data: JSON.stringify(info),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function(data, textStatus, xhr) {
                if (xhr.status == 200){
                    $("#modalPayment").click();
                }else{
                    $("#modalButton").click();
                }
            },
            failure: function(error) {
                $("#modalButton").click();
            }
        });

        return false;
    }

     function quitaAcentos(str){
        for (var i=0;i<str.length;i++){
        //Sustituye "á é í ó ú"
            if (str.charAt(i)=="á") str = str.replace(/á/,"A");
            if (str.charAt(i)=="é") str = str.replace(/é/,"E");
            if (str.charAt(i)=="í") str = str.replace(/í/,"I");
            if (str.charAt(i)=="ó") str = str.replace(/ó/,"O");
            if (str.charAt(i)=="ú") str = str.replace(/ú/,"U");
            if (str.charAt(i)=="ñ") str = str.replace(/ñ/,"N");
            if (str.charAt(i)=="Á") str = str.replace(/Á/,"A");
            if (str.charAt(i)=="É") str = str.replace(/É/,"E");
            if (str.charAt(i)=="Í") str = str.replace(/Í/,"I");
            if (str.charAt(i)=="Ó") str = str.replace(/Ó/,"O");
            if (str.charAt(i)=="Ú") str = str.replace(/Ú/,"U");
            if (str.charAt(i)=="Ñ") str = str.replace(/Ñ/,"N");
        }
        return str;
      }

})(jQuery);