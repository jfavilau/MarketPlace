

/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";


    $(document).ready(function () {

        jQuery(".color1").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/green.css");
        });

        jQuery(".color2").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/orange.css");
        });

        jQuery(".color3").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/light-green.css");
        });

        jQuery(".color4").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/pink.css");
        });

        jQuery(".color5").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/deep-orange.css");
        });

        jQuery(".color6").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/red.css");
        });

        jQuery(".color7").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/deep-green.css");
        });

        $(".switcher-cog").on("click", function(){
            $('#switcher').toggleClass("show");
        });
    });

})(jQuery);

