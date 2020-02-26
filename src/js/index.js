import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

$(() => {

  $('#fieldsForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();

    $('#fieldsForm').addClass('was-validated');
  });

  var data = { "employee":{ "name":"John", "age":30, "city":"New York" }, "employee":{ "name":"John", "age":30, "city":"New York" } };
  $('pre').text(JSON.stringify(data, null, 2));

  var map = new google.maps.Map(
    document.getElementById('map'), 
    {
      zoom: 4, 
      center: {lat: -25.344, lng: 131.036}
    }
  );
});