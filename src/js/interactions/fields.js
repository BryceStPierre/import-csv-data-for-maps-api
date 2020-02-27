import $ from 'jquery';

import { store, retrieve } from '../utils/storage';

export const populateFields = () => {
  const fields = retrieve('fields');

  let dataFields = [...fields];
  dataFields.splice(0, 1);

  store('config', {
    fields: {
      geocoding: {      
        address: fields[0],
        city: fields[0],
        province: fields[0],
        postalCode: fields[0],
        country: fields[0]
      },
      data: dataFields
    }
  });


  fields.forEach(field => {
    let $option = $('<option />')
      .attr('value', field)
      .text(field);

    $('#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput')
      .append($option);
  });
};

export const populateDataFields = () => {
  const fields = retrieve('fields');
  let dataFields = [...fields];

  let values = Object.values(fields.geocoding);
  values.forEach(v => {
    let index = fields.findIndex(f => f === v);
    if (index !== -1)
      dataFields.splice(index, 1);
  });

  dataFields.forEach(field => {

  });
};

export const setGeocodingField = (name, fieldName) => {
  let config = Object.assign({}, retrieve('config'));
  config.fields.geocoding[name] = fieldName;
  store('config', config);
};

export const addDataField = fieldName => {
  let config = Object.assign({}, retrieve('config'));
  config.fields.data.push(fieldName);
  store('config', config);
};

export const removeDataField = fieldName => {
  let config = Object.assign({}, retrieve('config'));

  let index = config.fields.data.findIndex(f => f === fieldName);
  if (index !== -1)
    config.fields.data.splice(index, 1);

  store('config', config);
};