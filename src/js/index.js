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
  handleCsvFileChange, 
  handleJsonFileChange
} from './interactions/import';

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

      store('fields', contents.fields);
      store('data', contents.data);

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

      //console.log(contents);
      store('data', contents.data);

      $('#jsonFileLabel').text(`File: ${filename}`);
      $('#csvFileLabel').text('Choose CSV file...');
      $('#csvFileInput').val('');

      $('#importButton').prop('disabled', false);
    });
  });

  $('#importButton').click(() => {
    $('#jsonFileInput').prop('disabled', true);
    $('#csvFileInput').prop('disabled', true);
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
  })

  /*
   * Route Section
   */
  $('#fieldsReturnButton').click(returnToFieldsSection);
  $('#exportPdfButton').click(exportPdfReport);
});