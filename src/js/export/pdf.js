import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { dateAsYYYYMMDD } from '../utils/date';

const marginX = 10;

export const exportPdfReport = () => {
  const date = dateAsYYYYMMDD();
  const title = `Report - ${date}`
  const filename = `report-${date}.pdf`;

  let pdf = new jsPDF('p', 'px', 'letter');
  pdf.setProperties({ title });

  let y = 32;
  pdf.setFontSize(16);
  pdf.text(title, marginX, y);

  pdf.save(filename);
}