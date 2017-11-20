/*jQuery*/

(function ($) {

    $("#login").click(function(){


        var username = document.getElementById('username').value
        var password = document.getElementById('password').value;
        var url = $(this).data('url');

        if(username != ""  && password != ""){

            $.ajax({
            url: url,
            type: "POST",
            data: {
                "username": username, "password": password
            },
            success: function (data) {
                if (data.message == 'ok'){
                    window.location.replace("/");
                }
                else if (data.message == 'Nombre de usuario o clave incorrecta'){
                    $( "#modalButton" ).click();
                }
                else{
                    $( "#modalInactive" ).click();
                }
            },
            error: function (xhr) {
            }
            });
        }
        else{

        }

    });

})(jQuery);