const nodemailer = require("nodemailer");

const USER = process.env.USER || "";
const PASSWORD = process.env.PASWORD || "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

const sendMail = (from, to, subject, message) => {
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      throw new Error('No se pudo enviar el correo');
    } 
    if (data) {
      console.log(data);
      return data;
    } 
  });
};

module.exports = { sendMail }