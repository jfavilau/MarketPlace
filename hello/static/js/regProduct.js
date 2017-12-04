/*jQuery*/
(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
        downloadType ();
        downloadCategory ();
    });

    function downloadType() {

        $.getJSON(baseURL + "api/type/").done(function(data) {
            console.log("Ciudades: ", data);

            var types = data;

            $.each(types, function(i, item) {

                var myvar = '<option value="' + item.id + '">' + item.name + '</option>';
                    $("#type").append(myvar);
            });
        });
    }

    function downloadCategory() {

        $.getJSON(baseURL + "api/categories/").done(function(data) {

            console.log("Ciudades: ", data);

            var categorias = data;

            $.each(categorias, function(i, item) {

                var myvar = '<option value="' + item.id + '">' + item.name + '</option>';
                    $("#category").append(myvar);
            });
        });
    }
})(jQuery);