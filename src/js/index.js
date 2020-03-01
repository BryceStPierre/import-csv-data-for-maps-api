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

import { 
  handleFileInput, 
  setFileLabel
} from './interactions/file';

import {
  populateGeocodingFields,
  populateDataFields,
  setGeocodingField
} from './interactions/fields';

import {
  createMap
} from './interactions/map';

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
    handleFileInput(e, (err, name, contents) => {
      if (err || !contents)
        return setFileLabel('Invalid file format, or file is too short.');

      store('fields', contents.fields);
      store('data', contents.data);
      $('#importButton').prop('disabled', false);
      $('#fileSummarySpan').html(`<b>${contents.data.length}</b> rows from <b>${name}</b>`);
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
      $('.form-control, .custom-control-input').prop('disabled', true);

      const data = retrieve('data');
      const config = retrieve('config');
      store('progress', 0);

      geocode(transform(data, config), (err, geocodedData) => {
        if (err || !geocodedData)
          return;

        store('data', geocodedData);
        store('route', []);
        createMap();
        goToRouteSection();
      });
    }
  })

  /*
   * Route Section
   */
  $('#fieldsReturnButton').click(returnToFieldsSection);

});