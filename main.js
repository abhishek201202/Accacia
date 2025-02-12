const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function extractFormData(pdfPath) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  const data = {};
  fields.forEach(field => {
    const name = field.getName();
    const type = field.constructor.name;
    let value = "N/A";

    if (type === "PDFTextField") {
      value = field.getText();
    } else if (type === "PDFCheckBox") {
      value = field.isChecked();
    } else if (type === "PDFRadioGroup") {
      value = field.getSelected();
    } else if (type === "PDFDropdown" || type === "PDFOptionList") {
      value = field.getSelected();
    }

    data[name] = { type, value };
  });

  return data;
}

extractFormData("test.pdf").then(data => {
    console.log(data)
});
