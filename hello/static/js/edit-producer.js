/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';
    var producerId = $("#producer_id").val();
    var producerData;

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

    $(window).on('load', function () {
        downloadProducerInfo(producerId);
    });

    function downloadProducerInfo(producer_id) {

        $.getJSON(baseURL + "api/producers/" + producer_id).done(function(data) {

            updateProducerView(data);
            producerData = data;

        });

    }

    function updateProducerView(data) {

        var title = data.name;
        $("#producer_name").html(title);
        $("#title_link").html(title);

        $("#prod_id_number").val(data.identificationNumber);
        $("#prod_image").val(data.image);
        $("#prod_name").val(data.name);
        $("#prod_description").val(data.description);
        $("#prod_address").val(data.address);
        $("#prod_city").val(data.city);
        $("#prod_latitude").val(data.latitude);
        $("#prod_longitude").val(data.longitude);
        $("#prod_number").val(data.phoneNumber);

    }

    $("#update-producer-form").submit(function() {

        if(producerData != null) {

            var name = $("#basketName").val();
            var price = $("#basketPrice").val();
            var description = $("#basketDescription").val();
            var active = true; //$("#cooperativeActive").val();

            var request;

            request = $.ajax({
              url: baseURL + "api/producers/" + producerId + "/",
              method: "PUT",
              data: {
                'typeIdentification': $("#prod_id_type").val(),
                'identificationNumber': $("#prod_id_number").val(),
                'image': $("#prod_image").val(),
                'name': $("#prod_name").val(),
                'description': $("#prod_description").val(),
                'address': $("#prod_address").val(),
                'city': $("#prod_city").val(),
                'latitude': $("#prod_latitude").val(),
                'longitude': $("#prod_longitude").val(),
                'phoneNumber': $("#prod_number").val(),
                'phoneNumber': $("#prod_number").val(),
                'cooperative': producerData.cooperative,
                'active': producerData.active
              },
              datatype: "json"
            });

            request.done(function(msg) {
                console.log("OKdd");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("ERROR:" + textStatus);
                //$("#result").html("Request failed: " + textStatus);
            });

        } else {

            return;

        }

    });

})(jQuery);