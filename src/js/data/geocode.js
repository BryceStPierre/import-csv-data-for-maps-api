import { incrementProgressBar } from '../interactions/progress';

// NEEDS TO BE COMPLETED

export const geocode = (data, callback) => {
  let geocoder = new google.maps.Geocoder();
  let increment = (1 / data.length) * 100;

  let promises = [];
  data.forEach((d, i) => {
    promises.push(
      geocoderPromise(null, d, increment, i + 1)
    );
  });

  Promise
    .all(promises)
    .then(geocodedData => {
      return callback(null, geocodedData.filter(d => d.latLng ? true : false))
    })
    .catch(err => {
      return callback(err, null)
    });
};

const geocoderPromise = (geocoder, object, increment, count) => {
  const second = 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      incrementProgressBar(increment);
      return resolve({});
    }, count * second);
  });
};


