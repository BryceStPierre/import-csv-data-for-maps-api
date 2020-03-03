import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

import { store, retrieve } from './utils/storage';

import {
  goToImportSection,
  goToFieldsSection,
  goToRouteSection,
  skipToRouteSection,
  returnToImportSection,
  returnToFieldsSection
} from './interactions/navigation';

import {
  populateGeocodingFields,
  populateDataFields,
  setGeocodingField
} from './interactions/fields';


import { 
  handleCsvFileChange, 
  handleJsonFileChange,
  resetImportFields
} from './interactions/import';

import {
  createMap,
  renderDirections,
  handleDirectionsChanged
} from './interactions/map';

import { resetProgressBar } from './interactions/progress';

import { geocode } from './data/geocode';
import { transform } from './data/transform';
import { embedJsonData } from './export/json';
import { exportPdfReport } from './export/pdf';

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
  $('#csvFileInput').change(e => {
    handleCsvFileChange(e, (err, filename, contents) => {
      if (err)
        return $('#csvFileLabel').text(err);

      store('data', contents.data);
      store('fields', contents.fields);

      $('#csvFileLabel').text(`File: ${filename}`);
      $('#jsonFileLabel').text('Choose JSON file...');
      $('#jsonFileInput').val('');

      $('#importButton').prop('disabled', false);
      $('#fileSummarySpan').html(`<b>${contents.data.length}</b> rows from <b>${filename}</b>`);
    });
  });

  $('#jsonFileInput').change(e => {
    handleJsonFileChange(e, (err, filename, contents) => {
      if (err)
        return $('#jsonFileLabel').text(err);

      store('data', contents.data);
      store('route', contents.route);

      $('#jsonFileLabel').text(`File: ${filename}`);
      $('#csvFileLabel').text('Choose CSV file...');
      $('#csvFileInput').val('');

      $('#importButton').prop('disabled', false);
    });
  });

  $('#importButton').click(() => {
    $('#csvFileInput').prop('disabled', true);
    $('#jsonFileInput').prop('disabled', true);

    const isCsv = $('#csvFileInput').val() ? true : false;
    const isJson = $('#jsonFileInput').val() ? true : false;

    if (isCsv) {
      populateGeocodingFields();
      populateDataFields();
      goToFieldsSection();
    } else if (isJson) {
      let map = createMap();
      let directionsRenderer = new google.maps.DirectionsRenderer({ preserveViewport: true });
      renderDirections(directionsRenderer, map);
      handleDirectionsChanged();
      embedJsonData();
      skipToRouteSection();
    }
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

  $('#plotButton').click(() => {
    if ($('#fieldsForm').get(0).checkValidity() === false) {
      $('#fieldsForm').addClass('was-validated');
    } else {
      $('.form-control, .custom-control-input').prop('disabled', true);
      $('#importReturnButton').prop('disabled', true);
      $('#plotButton').prop('disabled', true);

      store('progress', 0);

      geocode(transform(), (err, geocodedData) => {
        if (err || !geocodedData)
          return;

        store('data', geocodedData);
        store('route', []);
        createMap();
        embedJsonData();
        goToRouteSection();
      });
    }
  });

  $('#importReturnButton').click(() => {
    resetImportFields();
    returnToImportSection();
  });

  /*
   * Route Section
   */
  $('#exportPdfButton').click(exportPdfReport);

  $('#fieldsReturnButton').click(() => {
    $('.form-control, .custom-control-input').prop('disabled', false);
    $('#importReturnButton').prop('disabled', false);
    $('#plotButton').prop('disabled', false);
    resetProgressBar();
    returnToFieldsSection();
  });
});