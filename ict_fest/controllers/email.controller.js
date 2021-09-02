const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");



function sendEmail (to,subject,text) {
  //email send
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });
  
  transporter.sendMail(
    {
      from: process.env.EMAIL_ADDRESS,
      to: to,
      subject: subject,
      text: text,
    },
    (error, response) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Mail sent, ", response);
      }
    }
  );
}

module.exports = {sendEmail}