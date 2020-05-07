import $ from "jquery";

export const goToImportSection = () => {
  $("#homeSection").hide();
  $("#importSection").show();
};

export const goToFieldsSection = () => {
  $("#importSection").hide();
  $("#fieldsSection").show();
};

export const returnToImportSection = () => {
  $("#fieldsSection").hide();
  $("#importSection").show();
};

export const skipToRouteSection = () => {
  $("#importSection").hide();
  $("#routeSection").show();
};

export const goToRouteSection = () => {
  $("#fieldsSection").hide();
  $("#routeSection").show();
};

export const returnToFieldsSection = () => {
  $("#routeSection").hide();
  $("#fieldsSection").show();
};
