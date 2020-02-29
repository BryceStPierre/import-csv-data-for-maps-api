import $ from 'jquery';

import { retrieve, store } from '../utils/storage';

export const createMap = () => {
  const data = retrieve('data');
  let mapOptions = {
    mapTypeControl: false,
    rotateControl: false,
    zoom: 11
  };

  let markers = [];
  let bounds = new google.maps.LatLngBounds();
  let map = new google.maps.Map(
    document.getElementById('map'),
    mapOptions
  );
  let directionsRenderer = new google.maps.DirectionsRenderer({
    preserveViewport: true
  });
  directionsRenderer.addListener('directions_changed', () => {
    console.log('Directions changed.');
  })
  directionsRenderer.setMap(map);

  data.forEach((d, i) => {
    let m = new google.maps.Marker({
      map: map,
      title: d.addressString,
      position: d.latLng,
    });

    m.addListener('click', () => {
      pushRouteLocation(i);
      renderDirections(directionsRenderer, map);
      m.setMap(null);
    });
    m.addListener('mouseover', () => {      
      $('#locationPre').text(JSON.stringify(d.addressObject, null, 2));
      $('#dataPointPre').text(JSON.stringify(d.data, null, 2));
    });
    m.addListener('mouseout', () => {      
      $('#locationPre').text('No location to show.');
      $('#dataPre').text('No data to show.');
    });

    markers.push(m);
    bounds.extend(d.latLng);
  });
  map.fitBounds(bounds);
  return map;
};

const renderDirections = (directionsRenderer, map) => {
  const route = retrieve('route');
  if (!route)
    return directionsRenderer.setMap(null);

  if (route.length <= 1)
    return directionsRenderer.setMap(null);

  const data = retrieve('data');
  directionsRenderer.setMap(map);

  let waypoints = [];
  route.forEach((index, i) => {
    if (i !== 0 && i !== route.length - 1) {
      waypoints.push({
        location: data[index].latLng,
        stopover: true
      });
    }
  });

  let directionsService = new google.maps.DirectionsService;
  directionsService.route({
    origin: data[route[0]].latLng,
    destination: data[route[route.length - 1]].latLng,
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, (results, status) => {
    if (status === 'OK')
      directionsRenderer.setDirections(results);
  });
}

const pushRouteLocation = index => {
  let route = retrieve('route');
  if (!route)
    route = [];
  route.push(index);
  store('route', route);
}
