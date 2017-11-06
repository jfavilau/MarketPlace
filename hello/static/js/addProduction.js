/*jQuery*/

(function($) {
  // USE STRICT
  "use strict";

  var metodos;

  var baseURL = window.location.origin + '/';

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

        var info = {name: $('#name').val(),
                    shortName: $('#shortName').val(),
                    };

        $.ajax({
            type: "POST",
            url:  baseURL + "api/type/",
            data: JSON.stringify(info),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function(data, textStatus, xhr) {
                if (xhr.status == 201){
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

})(jQuery);
