const express = require("express");
const bodyParser = require("body-parser");

const { sendMail } = require("../services/mailer");

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/sendmail", async (req, res) => {
  const { from, to, subject, message } = req.body;
  try {
    await sendMail(from, to, subject, message);
    const successMessage = {
      success: true,
      message: "El correo se ha enviado correctamente!",
      code: 200,
    };
    res.send(successMessage);
  } catch (error) {
    const errorMessage = {
      success: false,
      message: error,
      code: 500,
    };
    res.status(500).send(errorMessage);
  }
});

module.exports = app;
