(function ($) {
    // USE STRICT
    "use strict";

    $(document).ready(function () {
        /* initialize the slider based on the Slider's ID attribute from the wrapper above */

        var slider1 = $('#js-slider');
        var slider2 = $('#js-slider-1');

        if (slider1 !== undefined) {
            slider1.show().revolution({
                /* options are 'auto', 'fullwidth' or 'fullscreen' */
                responsiveLevels: [1200, 992, 768, 480],
                gridwidth:[1240, 1000, 800, 500],
                sliderLayout: 'auto',
                minHeight: 800,
                delay: 8000,
                spinner: 'spinner2',
                /* basic navigation arrows and bullets */
                navigation: {
                    onHoverStop: "off",
                    arrows: {
                        enable: true,
                        style: 'uranus',
                        hide_onleave: false
                    },

                    bullets: {
                        enable: false,
                        style: 'hermes',
                        hide_onleave: false,
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 20,
                        space: 5
                    }
                }
            });
        }

        if (slider2 !== undefined) {
            slider2.show().revolution({
                /* options are 'auto', 'fullwidth' or 'fullscreen' */
                responsiveLevels: [1200, 992, 768, 480],
                gridwidth:[1240, 1000, 800, 500],
                sliderLayout: 'auto',
                minHeight: 800,
                delay: 8000,
                spinner: 'spinner2',
                /* basic navigation arrows and bullets */
                navigation: {
                    onHoverStop: "off",
                    arrows: {
                        enable: true,
                        style: 'uranus',
                        hide_onleave: true
                    },

                    bullets: {
                        enable: false,
                        style: 'hermes',
                        hide_onleave: false,
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 20,
                        space: 5
                    }
                }
            });
        }

    });

})(jQuery);