/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    //var baseURL = "https://cors.io/?https://marketplace201720.herokuapp.com/";
    var baseURL = window.location.origin+'/';

    /*Preloader animsition*/
    $(window).on('load', function () {
        //$('.page-loader').fadeOut('slow', function () {
          //  $(this).remove();
        //});
        downloadProducts();
        downloadDayBasket();
        downloadProducers();
    });

    function downloadProducts() {

        console.log("Downloading products");

        $.getJSON(baseURL + "getWeeklyProducts/").done(function(data) {

            console.log("Data:" + JSON.stringify(data));

            $.each(data.message.WeeklyProducts, function(i, item) {

                console.log("ProductID:" + item.product);
                downloadProduct(item.product)

            });
        });
    }

    function downloadProduct(productId) {

        $.getJSON(baseURL + "api/products/" + productId).done(function(item) {

            console.log("Data:" + JSON.stringify(item));

            if(!item.isBasket){
            var myvar = '<div class=\"col-md-3 col-xs-6 product-1 miso-prd-holder\">' +
                            '<div class=\"miso-prd-id\">' + item.id + '</div>' +
                            '<div class=\"miso-prd-qty\"></div>' +
                            '<div class=\"miso-prd-total\" >' + item.quantity + '</div>' +
                            '<div class=\"miso-prd-is-basket\" hidden>' + item.isBasket + '</div>' +
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
            }else{
            var myvar = '<div class=\"col-md-3 col-xs-6 product-1 miso-prd-holder\">' +
                            '<div class=\"miso-prd-id\">' + item.id + '</div>' +
                            '<div class=\"miso-prd-qty\"></div>' +
                            '<div class=\"miso-prd-total\" >' + item.quantity + '</div>' +
                            '<div class=\"miso-prd-is-basket\" hidden>' + item.isBasket + '</div>' +
                            '<div class=\"thumbnail product-image\" style=\"text-align:center;\">' +

                              '<div class=\"image-holder\">' +
                                '<img src="'+ item.image +'" alt="' + item.name +'" style=\"height:180px; width:180px; display:center;\">' +
                              '</div>' +

                              '<div class=\"product-action miso-cart-action\">' +
                                '<div class=\"product-action-list\">' +
                                    '<div class=\"action-item\">' +
                                        '<a class=\"fa fa-search-plus\" href="/canastas?id=0" title=\"Ver detalle\"></a>' +
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
        }

        $( "#products-carousel" ).append( myvar );
        refreshCartGuiOperation();

        });

    }


    function downloadDayBasket() {

        $.getJSON(baseURL + "api/baskets/").done(function(data) {

            if(data.length > 0) {

                var basket = data[0];
                var item1 = basket.items[0];
                var item2 = basket.items[1];

                var myvar = '<div class="heading-section-deal-of-the-day">'+
                            '    <h3>' + basket.name + '</h3>'+
                            '</div>'+
                            '<div class="product-info-deal-of-the-day left">'+
                            '    <div class="product-image">'+
                            '        <img src="http://templates.aucreative.co/ecofood/images/icons/ic-carrot.png" alt="carrot" />'+
                            '    </div>'+
                            '    <div class="product-content">'+
                            '        <p class="name">' + item1.product.name +' por ' + item1.quantity + ' ' + item1.product.unit +'</p>'+
                            '        <p class="content">Maecenas tristique gravida, odio et sagi ttis justo endisse ultricies</p>'+
                            '    </div>'+
                            '</div>'+
                            '<div class="product-info-deal-of-the-day right">'+
                            '    <div class="product-image">'+
                            '        <img src="http://templates.aucreative.co/ecofood/images/icons/ic-corn.png" alt="corn" />'+
                            '    </div>'+
                            '    <div class="product-content">'+
                            '        <p class="name">' + item2.product.name +' por ' + item2.quantity + ' ' + item2.product.unit +'</p>'+
                            '        <p class="content">Maecenas tristique gravida, odio et sagi ttis justo endisse ultricies</p>'+
                            '    </div>'+
                            '</div>'+
                            '<div class="product-deal-of-the-day">'+
                            '    <img src="http://templates.aucreative.co/ecofood/images/deal-of-the-day-01.png" alt="Canasta del día" />'+
                            '</div>'+
                            '<div class="action-deal-of-the-day">'+
                            '    <div class="action-content">'+
                            '        <p class="price">Precio: $' + basket.price + '</p>'+
                            '        <a class="btn-add-to-cart au-btn au-btn-radius au-btn-primary" href="/canastas/">Ver todas las canastas</a>'+
                            '    </div>'+
                            '</div>';

                $( "#deal-of-the-day" ).append( myvar );

            } else { // No baskets

                var myvar2 ='<div class="heading-section-deal-of-the-day">'+
                            '    <h3>Canasta del día</h3>'+
                            '</div>'+
                            '<div class="product-deal-of-the-day">'+
                            '    <img src="https://image.ibb.co/eVhJAb/deal_of_the_day_01.png" alt="Canasta del día" />'+
                            '</div>' +
                            '<div class="action-deal-of-the-day">'+
                            '    <div class="action-content">'+
                            '        <p class="price">Ninguna</p>'+
                            '        <p> Revisa mañana para aprovechar las mejores promociones</p>'+
                            '        <a class="btn-add-to-cart au-btn au-btn-radius au-btn-primary" href="/canastas/">Ver todas las canastas</a>'+
                            '    </div>'+
                            '</div>';

                $( "#deal-of-the-day" ).append( myvar2 );

            }

        });

    }

    function downloadProducers() {

        console.log("Downloading producers");

        $.getJSON(baseURL + "api/producers/").done(function(data) {

            console.log("Data:" + data);

            $.each(data, function(i, item) {

                var products = item.products;
                var prod = "";

                $.each(products, function(i, product) {
                    prod += ", " + product.name;
                });

                var myvar = '<div class="testimonials-1" style="text-align:center;">'+
                                '<p class="testimonials-name">' + item.name.toUpperCase() + '</p>'+
                                '<div class="testimonials-image">'+
                                    '<img src="' + item.image +'?resize=150%2C150" alt="LAUREN REED"/>'+
                                '</div>'+
                                '<div >'+
                                    '<p>"Ofrezco productos de calidad, entre ellos: ' + prod + ' y muchos más por venir!"</p>'+
                                    '<a href="productores/' + Number(i+1) +'">Ver todos</a>'+
                                '</div>'+
                            '</div>';

                $( "#producers-carousel" ).append( myvar );

            });
            refreshCartGuiOperation();
        });
    }

})(jQuery);
