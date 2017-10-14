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

            $.each(data, function(i, item) {

                var myvar = '<li>' +
                                '<a href=\"#\" id=\"category' + i +'\">' + item.name + '</a>' +
                                '<span class=\"totals\">(' + item.products.length + ')</span>' +
                            '</li>';

                $( "#product-category-list" ).append( myvar ).on('click', 'a', function () {
                    selectCategory(i);
                });

            });

        });
    }

    function selectCategory(pos) {
        console.log("Position: " + pos);
    }

})(jQuery);


/*

hamburgerAnimation.on("click", function () {
                hamburgerAnimation.toggleClass("is-active");
            });

<div class="col-md-4 col-sm-6">
                        <!-- .product-1-->
                        <div class="product-1">
                            <div class="product-image">
                                <div class="image-holder">
                                    <img src="images/product-item-01.jpg" alt="Egg free mayo" />
                                </div>
                                <div class="product-status hot">
                                    <span>HOT</span>
                                </div>
                                <div class="product-action">
                                    <div class="product-action-list">
                                        <div class="action-item">
                                            <a class="fa fa-search-plus" href="#" data-toggle="modal" data-target="#myModal" data-toggle-tooltip="tooltip" data-placement="top" title="Quick view"></a>
                                        </div>
                                        <div class="action-item">
                                            <a class="fa fa-shopping-cart" href="shopping-cart.html" data-toggle-tooltip="tooltip" data-placement="top" title="Add to cart"></a>
                                        </div>
                                        <div class="action-item">
                                            <a class="fa fa-heart" href="wishlist-page.html" data-toggle-tooltip="tooltip" data-placement="top" title="Add to wishlist!"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-content">
                                <h3 class="title">
                                    <a class="name" href="product-details-1.html">Egg free mayo</a>
                                </h3>
                                <p class="price">$ 10.00</p>
                            </div>
                        </div>
                        <!-- end .product-1-->
                    </div>*/

