(function ($) {
    // USE STRICT
    "use strict";

    $(document).ready(function() {
        var accordion_select = $('.accordion');

        if (accordion_select !== undefined) {
            accordion_select.each(function () {
                $(this).accordion({
                    "transitionSpeed": 400,
                    transitionEasing: 'ease-in-out'
                });
            });
        }
    });

})(jQuery);




