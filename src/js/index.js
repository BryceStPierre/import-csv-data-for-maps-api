import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

import { store } from "./utils/storage";

import {
  goToImportSection,
  goToFieldsSection,
  goToRouteSection,
  skipToRouteSection,
  returnToImportSection,
  returnToFieldsSection,
} from "./interactions/navigation";

import {
  handleCsvFileChange,
  handleJsonFileChange,
  resetImportFields,
} from "./interactions/import";

import {
  populateGeocodingFields,
  populateDataFields,
  setGeocodingField,
  setFieldsDisabled,
} from "./interactions/fields";

import {
  createMap,
  renderDirections,
  handleDirectionsChanged,
} from "./interactions/map";

import { geocode } from "./interactions/geocode";
import { resetProgressBar } from "./interactions/progress";

import { embedJsonData } from "./export/json";
import { exportPdfReport } from "./export/pdf";

$(() => {
  /*
   * Home Section
   */
  $("#getStartedButton").click(() => {
    goToImportSection();
    $("#importButton").prop("disabled", true);
  });

  /*
   * Import Section
   */
  $("#csvFileInput").change((e) => {
    handleCsvFileChange(e.target.files, (err, filename, contents) => {
      if (err) return $("#csvFileLabel").text(err);

      store("data", contents.data);
      store("fields", contents.fields);

      $("#csvFileLabel").text(`File: ${filename}`);
      $("#jsonFileLabel").text("Choose JSON file...");
      $("#jsonFileInput").val("");
      $("#importButton").prop("disabled", false);

      $("#fileSummarySpan").html(
        `<b>${contents.data.length}</b> rows from <b>${filename}</b>`
      );
    });
  });

  $("#jsonFileInput").change((e) => {
    handleJsonFileChange(e.target.files, (err, filename, contents) => {
      if (err) return $("#jsonFileLabel").text(err);

      store("data", contents.data);
      store("route", contents.route);

      $("#jsonFileLabel").text(`File: ${filename}`);
      $("#csvFileLabel").text("Choose CSV file...");
      $("#csvFileInput").val("");
      $("#importButton").prop("disabled", false);
    });
  });

  $("#importButton").click(() => {
    $("#csvFileInput").prop("disabled", true);
    $("#jsonFileInput").prop("disabled", true);

    const isCsv = $("#csvFileInput").val() ? true : false;
    const isJson = $("#jsonFileInput").val() ? true : false;

    if (isCsv) {
      populateGeocodingFields();
      populateDataFields();
      goToFieldsSection();
    } else if (isJson) {
      renderDirections(
        new google.maps.DirectionsRenderer({ preserveViewport: true }),
        createMap()
      );
      handleDirectionsChanged();
      embedJsonData();
      skipToRouteSection();
    }
  });

  /*
   * Fields Section
   */
  $("#fieldsForm").submit((e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  $(
    "#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput"
  ).change(function () {
    setGeocodingField($(this).attr("name"), $(this).val());
    populateDataFields();
  });

  $("#plotButton").click(() => {
    if ($("#fieldsForm").get(0).checkValidity()) {
      setFieldsDisabled(true);
      store("progress", 0);

      geocode((err, geocodedData) => {
        if (err || !geocodedData) return;

        store("data", geocodedData);
        store("route", []);
        createMap();
        embedJsonData();
        goToRouteSection();
      });
    } else {
      $("#fieldsForm").addClass("was-validated");
    }
  });

  $("#importReturnButton").click(() => {
    resetImportFields();
    returnToImportSection();
  });

  /*
   * Route Section
   */
  $("#exportPdfButton").click(exportPdfReport);

  $("#fieldsReturnButton").click(() => {
    setFieldsDisabled(false);
    resetProgressBar();
    returnToFieldsSection();
  });
});
