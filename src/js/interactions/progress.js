import $ from 'jquery';

import { store, retrieve } from '../utils/storage';

export const incrementProgressBar = increment => {
  $('#progressBarContainer').show();

  let progress = retrieve('progress');
  progress += increment;

  $('#progressBar').css('width', `${progress.toFixed(1)}%`);
  $('#progressBar').text(`${progress.toFixed(1)}%`);

  store('progress', progress);
};