/*
  Sample CSV Input: 
  column_a,column_b,column_c
  1,2,3
  4,5,6

  Sample JSON Output:
  [
    {
      column_a: 1,
      column_b: 2,
      column_c: 3
    },
    {
      column_a: 4,
      column_b: 5,
      column_c: 6
    }
  ]
*/

export const parseCsv = (text) => {
  let lines = text.split("\r\n");

  if (lines.length < 3) return null;

  let data = [];
  let fields = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    let row = {};
    let values = lines[i].split(",");

    for (let j = 0; j < fields.length; j++) row[fields[j]] = values[j];

    data.push(row);
  }

  return {
    fields,
    data,
  };
};

export const parseJson = (text) => JSON.parse(text);
