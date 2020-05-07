import { incrementProgressBar } from "../interactions/progress";

export const geocode = (data, callback) => {
  let geocoder = new google.maps.Geocoder();
  let increment = (1 / data.length) * 100;

  let promises = [];
  data.forEach((d, i) => {
    promises.push(geocoderPromise(geocoder, d, increment, i));
  });

  Promise.all(promises)
    .then((geocodedData) =>
      callback(
        null,
        geocodedData.filter((d) => d.latLng !== null)
      )
    )
    .catch((err) => callback(err, null));
};

const geocoderPromise = (geocoder, object, increment, seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      geocoder.geocode({ address: object.addressString }, (results, status) => {
        let o = Object.assign({}, object);
        o.latLng = null;

        if (status === google.maps.GeocoderStatus.OK)
          o.latLng =
            results && results.length > 0 ? results[0].geometry.location : null;

        incrementProgressBar(increment);
        return resolve(o);
      });
    }, seconds * 1000);
  });
};
