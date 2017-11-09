/*jQuery*/
var producer_changes = {};

(($) => {
  'use strict';

  var baseURL = window.location.origin + '/';

  console.log('Loading producers');

  downloadProducers();

  function downloadProducers() {
    producer_changes = {};

    $.getJSON(baseURL + 'api/producers')
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
          producer += ' <a href="editProducer/'+id+'">' + name + '</a>';
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
            item.active = !item.active;
            activateProducer(item);
          });
        });
      });
  }

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({

    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
      }
    }

  });

  function activateProducer(producer) {
    var data = JSON.stringify(producer);
    console.log(data);
    $.ajax({
      type: "PUT",
      url: baseURL + 'api/producers/'+ producer.id + '/',
      datatype: "json",
      // contentType: "application/json",
      data: {
        'name': producer.name,
        'phoneNumber': producer.phoneNumber,
        'identificationNumber': producer.identificationNumber,
        'cooperative': producer.cooperative,
        'address': producer.address,
        'active': producer.active
      },
    });
  }
})(jQuery);
