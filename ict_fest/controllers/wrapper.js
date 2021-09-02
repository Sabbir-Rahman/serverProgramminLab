const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');



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

function hashPassword(text){
  const passwordHash = bcrypt.hashSync(text, 10);
  return passwordHash  
}

module.exports = {sendEmail,hashPassword}