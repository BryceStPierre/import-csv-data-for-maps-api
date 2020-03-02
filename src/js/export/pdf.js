import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { retrieve } from '../utils/storage';
import { alphabet } from '../utils/array';
import { jsonAsText } from '../utils/string';
import { dateAsYYYYMMDD } from '../utils/date';

const marginX = 10;
const marginY = 16;
const line = '_______________________________';

export const exportPdfReport = () => {
  const date = dateAsYYYYMMDD();
  const title = `Report - ${date}`
  const filename = `report-${date}.pdf`;

  const data = retrieve('data');
  const route = retrieve('route');

  let pdf = new jsPDF('p', 'px', 'letter');
  pdf.setProperties({ title });

  let y = marginY;
  pdf.setFontSize(16);
  pdf.text(title, marginX, y);

  y += 24;
  pdf.setFontSize(12);
  pdf.text('Route', marginX, y);
  
  const tableHead = [[
    'Location', 
    'Details',
    'Data',
    'Notes'
  ]];

  let tableBody = [];
  route.forEach((index, i) => {
    tableBody.push([
      alphabet[i],
      data[index].addressString,
      jsonAsText(data[index].data),
      line
    ]);
  });

  y += 16;
  pdf.autoTable({
    startY: y,
    head: tableHead,
    body: tableBody, 
    theme: 'plain'
  });

  pdf.save(filename);
}