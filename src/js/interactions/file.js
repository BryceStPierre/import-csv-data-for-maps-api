import $ from 'jquery';

const parseCsv = text => {
  let lines = text.split('\r\n');

  if (lines.length < 3) {
    return null;
  }
  
  let data = [];
  let fields = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    let row = {};
    let currentLine = lines[i].split(',');

    for (let j = 0; j < fields.length; j++) 
      row[fields[j]] = currentLine[j];

    data.push(row);
  }
  return {
    fields,
    data
  };
} 

export const handleFileInput = (e, callback) => {
  if (e.target.files.length < 1) {
    return;
  }

  let file = e.target.files[0];

  if (file.type !== 'text/csv') {
    return;
  }

  $('#fileLabel').text(`File: ${file.name}`);

  let fileReader = new FileReader();
  fileReader.onload = e => callback(null, parseCsv(e.target.result));
  fileReader.onerror = err => callback(err, null);
  fileReader.readAsText(file);
};

