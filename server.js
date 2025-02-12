const express = require("express");
const axios = require("axios");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/extract-pdf-data", async (req, res) => {
  const { pdfUrl } = req.body;
  if (!pdfUrl) {
    return res.status(400).json({ error: "PDF URL is required" });
  }

  try {
    // const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    // const pdfBytes = response.data;
    // for test i have hard coded the local pdf, for production uncomment the above 2 lines
    const pdfBytes = fs.readFileSync("test.pdf");
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const data = {};
    fields.forEach((field) => {
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

    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
