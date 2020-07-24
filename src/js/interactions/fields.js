import $ from "jquery";

import { store, retrieve } from "../utils/storage";

export const populateGeocodingFields = () => {
  const fields = retrieve("fields");

  store("config", {
    fields: {
      geocoding: {
        address: fields[0],
        city: fields[0],
        province: fields[0],
        postalCode: fields[0],
        country: fields[0],
      },
      data: []
    },
  });

  fields.forEach((field) => {
    let $option = $("<option />").attr("value", field).text(field);

    $(
      "#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput"
    ).append($option);
  });
};

export const setGeocodingField = (name, fieldName) => {
  let config = retrieve("config");
  config.fields.geocoding[name] = fieldName;
  store("config", config);
};

export const populateDataFields = () => {
  const fields = retrieve("fields");
  const config = retrieve("config");

  let dataFields = [...fields];
  let geocodingFields = Object.values(config.fields.geocoding);
  geocodingFields.forEach((v) => {
    let index = dataFields.findIndex((f) => f === v);
    if (index !== -1) dataFields.splice(index, 1);
  });

  config.fields.data = dataFields;
  store("config", config);

  $("#dataFieldsContainer").html("");

  dataFields.forEach((field) => {
    let $switch = $("<div />").attr("class", "custom-control custom-switch");

    let $input = $("<input />")
      .attr("class", "custom-control-input")
      .attr("type", "checkbox")
      .attr("name", field)
      .attr("id", field)
      .prop("checked", true)
      .change(function () {
        if ($(this).prop("checked")) addDataField($(this).attr("name"));
        else removeDataField($(this).attr("name"));
      });

    let $label = $("<label />")
      .attr("class", "custom-control-label")
      .attr("for", field)
      .text(field);

    $switch.append($input);
    $switch.append($label);
    $("#dataFieldsContainer").append($switch);
  });
};

const addDataField = (fieldName) => {
  let config = retrieve("config");
  config.fields.data.push(fieldName);
  store("config", config);
};

const removeDataField = (fieldName) => {
  let config = retrieve("config");

  let index = config.fields.data.findIndex((f) => f === fieldName);
  if (index !== -1) config.fields.data.splice(index, 1);

  store("config", config);
};

export const setFieldsDisabled = (disabled) => {
  $(".form-control, .custom-control-input").prop("disabled", disabled);
  $("#importReturnButton").prop("disabled", disabled);
  $("#plotButton").prop("disabled", disabled);
};
