export const parseCsv = (text) => {
  let lines = text.split("\r\n");

  if (lines.length < 3) return null;

  let data = [];
  let fields = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    let row = {};
    let currentLine = lines[i].split(",");

    for (let j = 0; j < fields.length; j++) row[fields[j]] = currentLine[j];

    data.push(row);
  }

  return {
    fields,
    data,
  };
};

export const parseJson = (text) => JSON.parse(text);
