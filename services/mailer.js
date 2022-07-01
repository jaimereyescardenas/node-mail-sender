const nodemailer = require("nodemailer");

const USER = process.env.USER || "";
const PASSWORD = process.env.PASWORD || "";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

const verifyMailConnection = async () => {
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log('Servidor listo para enviar correos :D');
            resolve(success);
        }
    });
});
};

const sendMail = async (from, to, subject, message) => {
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  await verifyMailConnection();

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        reject('No se pudo enviar el correo');
      } 
      if (data) {
        console.log(data);
        resolve(data);
      } 
    });
  });
};

module.exports = { sendMail }