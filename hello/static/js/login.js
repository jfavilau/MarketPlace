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
                else{
                    var text = '<h5 class="checkout-heading" style="margin-left: 3cm;">Username o Password Incorrecto!</h5><br>';
                    $( "#Error" ).empty();
                    $( "#Error" ).append( text );
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