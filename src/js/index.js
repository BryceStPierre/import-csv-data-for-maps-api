import 'bootstrap';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

$(() => {
  var data = { "employee":{ "name":"John", "age":30, "city":"New York" }, "employee":{ "name":"John", "age":30, "city":"New York" } };
  $('pre').text(JSON.stringify(data, null, 2));

  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
});