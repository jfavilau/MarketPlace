/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var baskets;

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
            downloadBaskets();
    });

    function downloadBaskets() {

        $.getJSON(baseURL + "api/baskets/").done(function(data) {

            console.log("Baskets", data);

            baskets = data;

            $.each(baskets, function(i, item) {

                var myvar = '<li>' +
                                '<a href=\"#\" id=\"basket' + i +'\">' + '*' + " " +  item.name + '</a>' +
                                '<span>' + item.description + ' ($' + item.price + ')</span>' +
                            '</li>';

                $( "#product-baskets-list" ).append(myvar);
                //$( "#basket" + i).click(function() {
                  //  selectBasket(i);
                //});

            });

            hideLoader();

        });
    }

    function hideLoader() {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
    }

})(jQuery);

