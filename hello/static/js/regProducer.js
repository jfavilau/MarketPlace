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

    function enviarForm() {

        var info = {typeIdentification: $('#typeIdentification').val(),
                    identificationNumber : $('#identificationNumber').val(),
                    image: $('#image').val(),
                    name: $('#name').val(),
                    description: $('#description').val(),
                    address: $('#address').val(),
                    city: $('#city').val(),
                    latitude: $('#latitude').val(),
                    longitude: $('#longitude').val(),
                    phoneNumber: $('#phoneNumber').val(),
                    cooperative: $('#cooperative').val(),
                    active: $('#active').val()
                    };

        $.ajax({
            type: "POST",
            url: "{% url 'producers-list' %}",
            data: JSON.stringify(info),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function(data, textStatus, xhr) {
                if (xhr.status == 201){
                    console.log(data);
                    alert("¡SOLICITUD EXITOSA! Su solicitud estará en proceso de revisión, el administrador se comunicará con usted cuando termine el proceso");
                    window.location = "{% url 'index' %}";
                }else{
                    alert("¡HA OCURRIDO UN ERROR EN LA SOLICITUD INTENTE DE NUEVO!");
                    window.location = "{% url 'regProducer' %}";
                }
            },
            failure: function(error) {
                alert("Hubo un error: " + error);
            }
        });

        return false;
    }

})(jQuery);
