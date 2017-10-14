/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    /*Preloader animsition*/
    $(window).on('load', function () {
        $('.page-loader').fadeOut('slow', function () {
            $(this).remove();
            downloadProducts();
        });

    });

    /*Product detail*/
    $('#myModal').on('show.bs.modal', function(e) {
      var product_id = e.relatedTarget.dataset.product;

      $(".input-size").val("");

      $.getJSON(baseURL + "api/products/" + product_id).done(function(data) {

        var description = "<p>" + data.description + "</p>" +
                            '<p>Disponible</p>' +
                            '<p>SKU: ' + data.id + '</p>';

        $( "#product-detail-image" ).html( "<img src=" + data.image + " alt=" + data.name + "/>" );
        $( "#product-detail-name" ).html( "<h3>" + data.name + "</h3>" );
        $( "#product-detail-price" ).html( "<p> $" + data.price + " / " + data.unit +"</p>" );
        $( "#product-detail-description" ).html( description );

      });

    });

    function downloadProducts() {
        $.getJSON(baseURL + "api/products/").done(function(data) {
            $.each(data, function(i, item) {

                var myvar = '<div class=\"col-md-3 col-xs-6 product-1 miso-prd-holder\">' +
                                '<div class=\"miso-prd-id\">' + item.id + '</div>' +
                                '<div class=\"miso-prd-qty\"></div>' +
                                '<div class=\"thumbnail product-image\" style=\"text-align:center;\">' +

                                  '<div class=\"image-holder\">' +
                                    '<img src="'+ item.image +'" alt="' + item.name +'" style=\"height:180px; width:180px; display:center;\">' +
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

                                  '<div class=\"product-content\" style=\"text-align:center;\">' +
                                    '<h3 class=\"title\">' +
                                        '<a class=\"name\" href=\"#\" style=\"font-size:18px;color:#333;margin-bottom:10px;\">' + item.name + '</a>' +
                                    '</h3>' +
                                    '<p class=\"price\" style=\"color:#5c9b5c; margin-top:10px; \"> $ ' + item.price + ' / ' + item.unit +'</p>' +
                                  '</div>' +
                                '</div>' +
                            '</div>';

                $( "#products-carousel" ).append( myvar );

            });
        });
    }

})(jQuery);