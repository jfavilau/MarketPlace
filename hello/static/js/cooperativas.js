/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var cooperatives;

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
            downloadCooperatives();
    });

    function downloadCooperatives() {

        $.getJSON(baseURL + "api/cooperatives/").done(function(data) {

            console.log("Cooperativas: ", data);

            cooperatives = data;

            $.each(cooperatives, function(i, item) {

                var myvar = '<li>'+
        '                        <a href="#">' + item.name + ' (' + item.city.shortName + ')</a>'+
        '                        <a href="#" style="float: right; height:32px; padding-top:8px;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>'+
        '                    </li>';

                $( "#cooperatives-list" ).append(myvar);

            });

        });
    }

})(jQuery);