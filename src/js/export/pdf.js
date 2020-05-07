import jsPDF from "jspdf";
import "jspdf-autotable";

import { retrieve } from "../utils/storage";
import { alphabet } from "../utils/array";
import { jsonAsText } from "../utils/string";
import { dateAsYYYYMMDD } from "../utils/date";

const marginX = 10;
const marginY = 20;

export const exportPdfReport = () => {
  const data = retrieve("data");
  const route = retrieve("route");

  const title = `Report - ${dateAsYYYYMMDD()}`;
  const filename = `report-${dateAsYYYYMMDD()}.pdf`;

  let pdf = new jsPDF("p", "px", "letter");
  pdf.setProperties({ title });

  let y = marginY;
  pdf.setFontSize(16);
  pdf.text(title, marginX, y);

  y += 20;
  pdf.setFontSize(14);
  pdf.text("Route", marginX, y);

  const tableHead = [["Location", "Address", "Data"]];

  const tableBody = route.map((index, i) => {
    return [
      alphabet[i],
      data[index].addressString,
      jsonAsText(data[index].data),
    ];
  });

  y += 8;
  pdf.setFontSize(12);
  pdf.autoTable({
    startY: y,
    head: tableHead,
    body: tableBody,
    theme: "plain",
  });

  y = pdf.previousAutoTable.finalY + 16;
  pdf.setFontSize(14);
  pdf.text("Directions", marginX, y);

  y += 16;
  pdf.setFontSize(11);
  pdf.text(
    "Click any of the address hyperlinks below to start directions through Google Maps:",
    marginX,
    y
  );

  let sectionMarginX = marginX + 25;

  y += 20;
  pdf.setFontSize(10);
  route.forEach((index, i) => {
    if (y > pdf.internal.pageSize.getHeight()) {
      pdf.addPage();
      y = marginY;
    }

    pdf.setTextColor("#000");
    pdf.text(alphabet[i], sectionMarginX, y);

    pdf.setTextColor("#00F");
    pdf.textWithLink(data[index].addressString, sectionMarginX + 30, y, {
      url: encodeURI(
        `https://www.google.com/maps/dir/?api=1&destination=${data[index].addressString}`
      ),
    });

    y += 16;
  });

  pdf.save(filename);
};
