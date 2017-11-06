/*jQuery*/

(function($) {
  // USE STRICT
  "use strict";

  var metodos;

  var baseURL = window.location.origin + '/';

  $(window).on('load', function() {
    downloadMetodos();
  });

  function downloadMetodos() {

    $.getJSON(baseURL + "api/type/").done(function(data) {

      console.log("Metodos: ", data);

      metodos = data;

      $.each(metodos, function(i, item) {

         var tbody =
                                  "<tr>"
                                +    "<td>" + item.id + "</td>"
                                +    "<td>" + item.shortName + "</td>"
                                +    "<td>" + item.name + "</td>"
                                +    "<td> <a class='editar' id='e" + item.id + "' href='#'> Editar </a> </td>"
                                + "</tr>";

         $("#metodos").append(tbody);

      });

    });
  }

})(jQuery);
