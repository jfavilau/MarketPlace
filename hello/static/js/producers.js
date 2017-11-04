/*jQuery*/
var producer_changes = {};

(($) => {
  'use strict';

  var baseURL = window.location.origin + '/';

  console.log('Loading producers');

  downloadProducers();

  function downloadProducers() {
    producer_changes = {};

    $.getJSON(baseURL + 'api/productores')
      .then((data) => {
        var producers = data;

        if (producers == null || producers == undefined) return;

        var producers_list = $('#producers-list');

        $.each(producers, (i, item) => {
          console.log(JSON.stringify(item));
          var name = item.name;
          var id = item.id;
          var active = item.active;

          var producer = '<li>';
          producer += ' <a href="#">' + name + '</a>';
          producer += ' <div style="float: right;">';
          producer += '   <label for="producer_active">Activo</label>';
          producer += '  <input class="producer_active" id="producer_active' + id;
          producer += '" value="' + id + '" type="checkbox"';
          if (active) producer += 'checked';
          producer += '>';
          producer += ' </div>';
          producer += '</li>';
          producers_list.append(producer);

          $('#producer_active' + id).click(() => {
            activateProducer(id, true);
            console.log(active);
          });
        });
      });
  }

  function activateProducer(id, status) {
    $.ajax({
      type: "PUT",
      url: baseURL + 'api/productores/',
      contentType: "application/json",
      data: {
        "data": {"id": id, "active":status}
      }
    });
  }
})(jQuery);
