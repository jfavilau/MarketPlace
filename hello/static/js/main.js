/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var baseURL = "http://localhost:8000/";

    $(document).ready(function () {
        /*fixed navbar when scroll*/
        var navbar = $("#js-navbar"),
            top;

        if (navbar) {
            top = navbar.offset().top;
            $(window).on("scroll", function (event) {
                var y = $(this).scrollTop();
                if (y >= top) {
                    navbar.addClass('fixed');
                } else {
                    navbar.removeClass('fixed');
                }
            });
        }


        /*Hamburger Menu*/
        var hamburgerAnimation = $(".hamburger.has-animation");
        var hamburgerNoAnimation = $(".hamburger");

        if (hamburgerAnimation) {
            hamburgerAnimation.on("click", function () {
                hamburgerAnimation.toggleClass("is-active");
            });
        }

        if (hamburgerNoAnimation) {
            hamburgerNoAnimation.on("click", function () {
                $(".nav-menu").toggleClass('open');
            });

        }



        // Navbar menu caret

        var btnCaret = $('.btn-caret');
        if (btnCaret) {
            btnCaret.on('click', function (e) {
                $(this).siblings('.drop-menu').slideToggle(200, 'linear');
                e.stopPropagation();
            });
        }

        /*Mini shop cart*/
        var miniShopCart = $(".mini-shopcart");
        var btnMiniShopCart = $(".js-mini-shopcart");

        if (miniShopCart && btnMiniShopCart) {
            btnMiniShopCart.on("click", function () {
                miniShopCart.toggleClass("open");
            });

            $(window).on('click', function (event) {
                if (!$(event.target).closest(miniShopCart).length && !$(event.target).closest(btnMiniShopCart).length) {
                    miniShopCart.removeClass('open');
                }
            });
        }


        var tooltip = $('[data-toggle-tooltip="tooltip"]');
        if (tooltip) {
            tooltip.tooltip();
        }


        // --------------------------------------------------
        // Back To Top
        // --------------------------------------------------
        var offset = 450;
        var duration = 500;
        var upToTop = $("#up-to-top");

        if (upToTop) {
            $(window).on('scroll', function () {
                if (upToTop) {
                    if ($(this).scrollTop() > offset) {
                        upToTop.fadeIn(duration);
                    } else {
                        upToTop.fadeOut(duration);
                    }
                }
            });

            upToTop.on('click', function (event) {
                event.preventDefault();
                $('html, body').animate({scrollTop: 0}, duration);
                return false;
            });
        }

        /* Scroll Like Mac*/
        SmoothScroll({
            keyboardSupport: false,
            animationTime: 560, // [ms]
            stepSize: 100 // [px]
        });

    });

    /*Preloader animsition*/
    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
            downloadProducts();
        });

    });

    function downloadProducts() {
        $.getJSON(baseURL + "api/products/").done(function(data) {
            $.each(data, function(i, item) {

                var myvar = '<div class=\"col-md-3 col-xs-6\">' +
                                '<div class=\"thumbnail\">' +
                                  '<img src="'+ item.image +'" alt="' + item.name +'" style=\"height:180px; width:180px; display:block;\">' +
                                  '<div class=\"product-content\" style=\"text-align:center;\">' +
                                    '<h3 class=\"title\">' +
                                        '<a class=\"name\" href=\"#\" style=\"font-size:18px;color:#333;margin-bottom:10px;\">' + item.name + '</a>' +
                                    '</h3>' +
                                    '<p class=\"price\" style=\"color:#5c9b5c; margin-top:10px; \"> $ ' + item.price +'</p>' +
                                  '</div>' +
                                '</div>' +
                            '</div>';

                $( "#products-carousel" ).append( myvar );

            });
        });
    }

})(jQuery);


