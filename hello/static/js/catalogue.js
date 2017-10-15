/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    var categories;

    var baseURL = window.location.origin+'/';

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

        productsHTML += '<div class="col-md-4 col-sm-6 product-1 miso-prd-holder">' +
                                '<div class=\"miso-prd-id\">' + item.id + '</div>' +
                                '<div class=\"miso-prd-qty\"></div>' +
                                '<div class=\"thumbnail product-image\" style=\"text-align:center;\">' +

                                  '<div class=\"image-holder\">' +
                                    '<img src="'+ item.image +'" alt="' + item.name +'" style=\"height:180px; width:180px;\">' +
                                  '</div>' +

                                  '<div class=\"product-action miso-cart-action\">' +
                                    '<div class=\"product-action-list\">' +
                                        '<div class=\"action-item\">' +
                                            '<a class=\"fa fa-search-plus\" href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\" data-product="' + item.id +'" data-toggle-tooltip=\"tooltip\" data-placement=\"top\" title=\"Ver detalle\"></a>' +
                                        '</div>' +
                                        '<div class=\"action-item miso-cart-plus\">' +
                                            '<a class=\"fa fa-plus\" data-toggle-tooltip=\"tooltip\" data-placement=\"top\" title=\"Agregar\"></a>' +
                                        '</div>' +
                                        '<div class=\"action-item miso-cart-minus\">' +
                                            '<a class=\"fa fa-minus\" data-toggle-tooltip=\"tooltip\" data-placement=\"top\" title=\"Remover\"></a>' +
                                        '</div>' +
                                        '<div class=\"action-item miso-cart-clear\">' +
                                            '<a class=\"fa fa-remove\" data-toggle-tooltip=\"tooltip\" data-placement=\"top\" title=\"Limpiar\"></a>' +
                                        '</div>' +
                                    '</div>' +
                                  '</div>' +

                                  '<div class="product-content">'+
                                    '<h3 class="title">'+
                                        '<a class="name" href="product-details-1.html">' + item.name +'</a>'+
                                    '</h3>'+
                                    '<p class="price">$ ' + item.price + ' / ' + item.unit +'</p>'+
                                '</div>'+
                                '</div>' +
                            '</div>';

        });

        $( "#products_by_category" ).replaceWith( productsHTML );

        hideLoader();
    }

})(jQuery);

