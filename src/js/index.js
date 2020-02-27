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
  populateFields,
  setGeocodingField
} from './interactions/fields';

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
    handleFileInput(e, (err, imported) => {
      store('fields', imported.fields);
      store('data', imported.data);
      $('#importButton').prop('disabled', false);
    });
  });

  $('#importButton').click(() => {
    if ($('#importForm').get(0).checkValidity() === false) {
      $('#importForm').addClass('was-validated');
    } else {
      goToFieldsSection();
      populateFields();
    }
  });

  /*
   * Fields Section
   */
  $('#importReturnButton').click(returnToImportSection);

  $('#plotButton').click(() => {
    if ($('#fieldsForm').get(0).checkValidity() === false)
      $('#fieldsForm').addClass('was-validated');
    else
      goToRouteSection();
  })

  /*
   * Route Section
   */
  $('#fieldsReturnButton').click(returnToFieldsSection);

  $('#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput')
    .change(function () {
      setGeocodingField($(this).attr('name'), $(this).val());
      console.log(retrieve('config').fields);
    });

  // $('pre').text(JSON.stringify(data, null, 2));

  $('#importForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();
  });
  $('#fieldsForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();
  });
});