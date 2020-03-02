import $ from 'jquery';

import { retrieve } from '../utils/storage';
import { dateAsYYYYMMDD } from '../utils/date';

export const embedJsonData = () => {
  const json = {
    data: retrieve('data'),
    route: retrieve('route')
  };
  const encodedJson = encodeURIComponent(JSON.stringify(json));

  const filename = `map-data-${dateAsYYYYMMDD()}.json`;
  $('#exportJsonButton').attr('download', filename);
  $('#exportJsonButton').attr('href', `data:text/json;charset=utf-8,${encodedJson}`);
}