import $ from 'jquery';

import { retrieve } from '../utils/storage';

export const createMap = () => {
  const data = retrieve('data');
  let mapOptions = {
    mapTypeControl: false,
    rotateControl: false,
    zoom: 11
  };

  let index = Math.floor(Math.random() * data.length);
  if (data && data[index])
    mapOptions.center = data[index].latLng;

  let markers = [];
  let bounds = new google.maps.LatLngBounds();
  let map = new google.maps.Map(
    document.getElementById('map'),
    mapOptions
  );

  data.forEach(d => {
    let m = new google.maps.Marker({
      map: map,
      title: d.addressString,
      position: d.latLng,
    });

    m.addListener('click', () => {
      
    });
    m.addListener('mouseover', () => {      
      $('#locationPre').text(JSON.stringify(d.addressObject, null, 2));
      $('#dataPointPre').text(JSON.stringify(d.data, null, 2));
    });
    m.addListener('mouseout', () => {      
      $('#locationPre').text('No location selected.');
      $('#dataPointPre').text('No location selected.');
    });

    markers.push(m);
    bounds.extend(d.latLng);
  });
  map.fitBounds(bounds);
  return map;
};
