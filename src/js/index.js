import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

import {
  goToImportSection,
  goToFieldsSection, 
  goToRouteSection,
  returnToImportSection,
  returnToFieldsSection
} from './interactions/navigation';

import { store } from './utils/storage';

import { handleFileInput } from './interactions/file';

import { populateFields } from './interactions/fields';

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


  // $('pre').text(JSON.stringify(data, null, 2));

  // var map = new google.maps.Map(
  //   document.getElementById('map'), 
  //   {
  //     zoom: 4, 
  //     center: {lat: -25.344, lng: 131.036}
  //   }
  // );

  $('#importForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();
  });
  $('#fieldsForm').submit(e => {
    e.preventDefault();
    e.stopPropagation();
  });
});