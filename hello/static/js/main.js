/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";
    //var baseURL = "https://marketplace201720.herokuapp.com/";
    //var baseURL = "http://localhost:8000/";
    var baseURL = window.location.origin+'/';

    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

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

    /*Product detail*/
    $('#myModal').on('show.bs.modal', function(e) {
      var product_id = e.relatedTarget.dataset.product;

      $(".input-size").val("");

      $.getJSON(baseURL + "api/products/" + product_id).done(function(data) {
        console.log(data);
        var description = "<p>" + data.description + "</p>" +
                            '<p>Disponible</p>' +
                            '<p>SKU: ' + data.id + '</p>';

        $( "#product-detail-image" ).html( "<img id ='product_info' src=" + data.image + " alt=" + data.name + " data-price="+data.price +" data-id="+data.id+" data-name="+data.name+" />" );
        $( "#product-detail-name" ).html( "<h3>" + data.name + "</h3>" );
        $( "#product-detail-price" ).html( "<p> $" + data.price + " / " + data.unit +"</p>" );
        $( "#product-detail-description" ).html( description );

      });

    });

})(jQuery);
