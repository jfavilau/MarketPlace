/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    //var baseURL = "https://cors.io/?https://marketplace201720.herokuapp.com/";
    var baseURL = "http://localhost:8000/";

    $(window).on('load', function () {
            downloadCategories();
    });

    function downloadCategories() {
        $.getJSON(baseURL + "api/categories/").done(function(data) {

            // Hide loader
            $('.page-loader').fadeOut('slow', function () {
                $(this).remove();
            });

            console.log(data);
        });
    }

})(jQuery);


