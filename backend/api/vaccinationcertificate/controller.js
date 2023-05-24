require('dotenv').config();
const vaccinationCertificate = require('../../model/vaccinationcertificate');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');

exports.issuevaccinationcertificate = async (req, res) => {
  try {
    console.log('>>>>>>>>', req.body);
    const data = await vaccinationCertificate.create(req.body);
    res.send({
      status: true,
      data: 'Certificate Generated Successfully',
    });
    generatePDF(req.body);
  } catch (e) {
    console.log(e.message);
    res.send({
      status: false,
      message: e.message,
    });
  }
};
async function generatePDF(data) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(14);

  // Set the content on the page using the provided data
  page.drawText('MEDICAL CERTIFICATE', {
    x: 50,
    y: page.getHeight() - 50,
    size: 18,
    underline: true,
  });

  page.drawText(`Certificate Number: ${data.certificateNumber}`, {
    x: 50,
    y: page.getHeight() - 100,
    size: 12,
  });

  page.drawText(`Patient Name: ${data.patientName}`, {
    x: 50,
    y: page.getHeight() - 140,
    size: 12,
  });
  page.drawText(`Disease: ${data.disease}`, {
    x: 50,
    y: page.getHeight() - 180,
    size: 12,
  });
  page.drawText(`Vaccine Name: ${data.vaccineName}`, {
    x: 50,
    y: page.getHeight() - 200,
    size: 12,
  });
  page.drawText(`Antigen: ${data.antigen}`, {
    x: 50,
    y: page.getHeight() - 240,
    size: 12,
  });

  page.drawText(`Issuer Name: ${data.issuerName}`, {
    x: 50,
    y: page.getHeight() - 300,
    size: 12,
  });

  page.drawText(`Issuer ID: ${data.issuerId}`, {
    x: 50,
    y: page.getHeight() - 340,
    size: 12,
  });

  page.drawText(`Issued Date and Time: ${data.issuedDateTime}`, {
    x: 50,
    y: page.getHeight() - 380,
    size: 12,
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}
