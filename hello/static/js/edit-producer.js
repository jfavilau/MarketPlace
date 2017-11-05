/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        downloadProducerInfo($("#producer_id").val());
    });

    function downloadProducerInfo(producer_id) {

        $.getJSON(baseURL + "producers/" + producer_id).done(function(data) {

            updateProducerView(data);

        });

    }

    function updateProducerView(data) {

        var title = data.name;
        $("#producer_name").html(title);
        $("#title_link").html(title);

    }

})(jQuery);