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
                    city: quitaAcentos($('#city').val().toUpperCase()),
                    latitude: $('#latitude').val(),
                    longitude: $('#longitude').val(),
                    phoneNumber: $('#phoneNumber').val(),
                    cooperative: $('#cooperative').val(),
                    products: $('#products').val(),
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