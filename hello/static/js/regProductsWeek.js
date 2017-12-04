/*jQuery*/
(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
        downloadType();
        downloadProducts ();
    });

    function downloadType() {

        $.getJSON(baseURL + "api/type/").done(function(data) {
            console.log("Metodos: ", data);

            var types = data;

            $.each(types, function(i, item) {

                var myvar = '<option value="' + item.id + '">' + item.name + '</option>';
                    $("#type").append(myvar);
            });
        });
    }

    function downloadProducts() {

        console.log("Downloading products");

        $.getJSON(baseURL + "getWeeklyProducts/").done(function(data) {


            $.each(data.message.WeeklyProducts, function(i, item) {

                console.log("ProductID:" + item.product);
                downloadProductsName(item.product)

            });
        });
    }
    function downloadProductsName(productId) {

        console.log("Downloading products Name");

        $.getJSON(baseURL + "api/products/" + productId +"/").done(function(item) {

            console.log("Data:" + JSON.stringify(item));
            var myvar = '<option value="' + item.id + '">' + item.name + '</option>';
                    $("#products").append(myvar);

        });
    }


})(jQuery);