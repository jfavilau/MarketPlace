/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var categories;

    //var baseURL = "https://cors.io/?https://marketplace201720.herokuapp.com/";
    var baseURL = "http://localhost:8000/";

    $(window).on('load', function () {
            downloadCategories();
    });

    function downloadCategories() {
        $.getJSON(baseURL + "api/categories/").done(function(data) {

            categories = data;

            $.each(categories, function(i, item) {

                var myvar = '<li>' +
                                '<a href=\"#\" id=\"category' + i +'\">' + item.name + '</a>' +
                                '<span class=\"totals\">(' + item.products.length + ')</span>' +
                            '</li>';

                $( "#product-category-list" ).append( myvar ).on('click', 'a', function () {
                    selectCategory(i);
                });

            });

            selectCategory(0);

        });
    }

    function hideLoader() {
        // Hide loader
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
        });}

    function selectCategory(pos) {

        var category = categories[pos];

        $("#category_name").text(category.name);

        var productsHTML = "";

        $.each(category.products, function(i, item) {

            productsHTML += '<div class="col-md-4 col-sm-6">'+
'                            <div class="product-1" style="text-align: center;">'+
'                                <div class="product-image">'+
'                                    <div class="image-holder">'+
'                                        <img src="'+ item.image +'" alt="' + item.name +'" style="width:180px;height:180px;" />'+
'                                    </div>'+
'                                    <div class="product-action">'+
'                                        <div class="product-action-list">'+
'                                            <div class="action-item">'+
'                                                <a class="fa fa-search-plus" href="#" data-toggle="modal" data-target="#myModal" data-toggle-tooltip="tooltip" data-placement="top" title="Quick view"></a>'+
'                                            </div>'+
'                                            <div class="action-item">'+
'                                                <a class="fa fa-shopping-cart" href="shopping-cart.html" data-toggle-tooltip="tooltip" data-placement="top" title="Add to cart"></a>'+
'                                            </div>'+
'                                            <div class="action-item">'+
'                                                <a class="fa fa-heart" href="wishlist-page.html" data-toggle-tooltip="tooltip" data-placement="top" title="Add to wishlist!"></a>'+
'                                            </div>'+
'                                        </div>'+
'                                    </div>'+
'                                </div>'+
'                                <div class="product-content">'+
'                                    <h3 class="title">'+
'                                        <a class="name" href="product-details-1.html">' + item.name +'</a>'+
'                                    </h3>'+
'                                    <p class="price">$ ' + item.price + ' / ' + item.unit +'</p>'+
'                                </div>'+
'                            </div>'+
'                        </div>';

        });

        $( "#products_by_category" ).replaceWith( productsHTML );

        hideLoader();
    }

})(jQuery);