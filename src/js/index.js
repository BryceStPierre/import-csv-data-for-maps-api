import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

import { store, retrieve } from './utils/storage';

import {
  goToImportSection,
  goToFieldsSection,
  goToRouteSection,
  returnToImportSection,
  returnToFieldsSection
} from './interactions/navigation';

import { handleFileInput } from './interactions/file';

import {
  populateGeocodingFields,
  populateDataFields,
  setGeocodingField
} from './interactions/fields';

import { geocode } from './data/geocode';
import { transform } from './data/transform';

$(() => {
  /*
   * Home Section
   */
  $('#getStartedButton').click(() => {
    goToImportSection();
    $('#importButton').prop('disabled', true);
  });

  /*
   * Import Section
   */
  $('#fileInput').change(e => {
    handleFileInput(e, (err, csv) => {
      if (err || !csv)
        return;

      store('fields', csv.fields);
      store('data', csv.data);
      $('#importButton').prop('disabled', false);
    });
  });

  $('#importButton').click(() => {
    goToFieldsSection();
    populateGeocodingFields();
    populateDataFields();
  });

  /*
   * Fields Section
   */
  $('#fieldsForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();
  });

  $('#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput').change(function () {
    setGeocodingField($(this).attr('name'), $(this).val());
    populateDataFields();
  });

  $('#importReturnButton').click(returnToImportSection);

  $('#plotButton').click(() => {
    if ($('#fieldsForm').get(0).checkValidity() === false) {
      $('#fieldsForm').addClass('was-validated');
    } else {
      store('progress', 0);

      const data = retrieve('data');
      const config = retrieve('config');

      geocode(transform(data, config), (err, geocodedData) => {
        if (err || !geocodedData)
          return;

        store('data', geocodedData);
        //initializeMap();
        goToRouteSection();
      });
    }
  })

  /*
   * Route Section
   */
  $('#fieldsReturnButton').click(returnToFieldsSection);

  // $('pre').text(JSON.stringify(data, null, 2));
});