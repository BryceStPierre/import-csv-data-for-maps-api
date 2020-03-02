import $ from 'jquery';

import { retrieve } from '../utils/storage';

export const embedJsonData = () => {
  const json = {
    data: retrieve('data'),
    route: retrieve('route')
  };
  const encodedJson = encodeURIComponent(JSON.stringify(json));

  const date = new Date();
  const filename = `map-${date.toISOString().split('T')[0]}`;

  $('#exportJsonButton').attr('download', `${filename}.json`);
  $('#exportJsonButton').attr('href', `data:text/json;charset=utf-8,${encodedJson}`);
}