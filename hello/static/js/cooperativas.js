/*jQuery*/

(function($) {
  // USE STRICT
  "use strict";

  var cooperatives;
  var cities;

  var baseURL = window.location.origin + '/';

  $(window).on('load', function() {
    downloadCooperatives();
    downloadCities();
  });

  function downloadCooperatives() {

    $("#cooperatives-list").html("");

    $.getJSON(baseURL + "api/cooperatives/").done(function(data) {

      console.log("Cooperativas: ", data);

      cooperatives = data;

      $.each(cooperatives, function(i, item) {

        i++;

        var myvar = '<li>' +
          '                        <a href="#">' + item.name + '</a>' +
          '                        <a id="delete-cooperative' + i + '" style="float: right; height:32px; padding-top:8px;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>' +
          '                    </li>';

        $("#cooperatives-list").append(myvar);

        $("#delete-cooperative" + i).click(function() {
          deleteCooperative(i);
        });

      });

    });
  }

  function downloadCities() {

    $.getJSON(baseURL + "api/cities/").done(function(data) {

      console.log("Ciudades: ", data);

      cities = data;

      $.each(cities, function(i, item) {

        var myvar = '<option value="' + item.id + '">' + item.name + '</option>';
        $("#cooperativeCity").append(myvar);

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

  $("#new-cooperative-form").submit(function() {

    var name = $("#cooperativeName").val();
    var city = $("#cooperativeCity").val();
    var active = true; //$("#cooperativeActive").val();

    var request;

    request = $.ajax({
      url: baseURL + "api/cooperatives/",
      method: "POST",
      data: {
        "name": name,
        "city": city,
        "active": active
      },
      datatype: "json"
    });

    request.done(function(msg) {
      $("#cooperatives-list").html("");
      downloadCooperatives();
    });

    request.fail(function(jqXHR, textStatus) {
      alert("ERROR");
      //$("#result").html("Request failed: " + textStatus);
    });

    return false;

  });

  function deleteCooperative(cooperative_id) {

    if (confirm('¿Está seguro?') != true) return;

    console.log("Delete the Cooperative: " + cooperative_id);

    var request;

    request = $.ajax({
      url: baseURL + "api/cooperatives/" + cooperative_id,
      method: "DELETE",
      datatype: "json"
    });

    request.done(function(msg) {
      downloadCooperatives();
    });

    request.fail(function(jqXHR, textStatus) {
      alert("ERROR");
      //$("#result").html("Request failed: " + textStatus);
    });

  }

})(jQuery);
