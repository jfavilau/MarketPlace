/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var categories;

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
            //downloadCategories();
            console.log("Selected producer: " + $("#producer_id").val());
    });

    function downloadProducer() {

        $.getJSON(baseURL + "api/producers/").done(function(data) {

            console.log("Categories", data);

            categories = data;

            $.each(categories, function(i, item) {

                var myvar = '<li>' +
                                '<a href=\"#\" id=\"category' + i +'\">' + item.name + '</a>' +
                                '<span class=\"totals\">(' + item.products.length + ')</span>' +
                            '</li>';

                $( "#product-category-list" ).append(myvar);
                $( "#category" + i).click(function() {
                    selectCategory(i);
                });

            });

            hideLoader();

        });
    }

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        console.log(sPageURL);
    }​

    function hideLoader() {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
    }

})(jQuery);

