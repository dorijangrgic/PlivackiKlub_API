import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass
  }
});

const sendMail = (to, url, res) => {
  const mailOptions = {
    from: process.env.email_user,
    to: to,
    subject: "Aktiviraj svoj racun",
    text: url
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send("Error while sending an email!");
    } else {
      res.status(200).send("Email successfully sent!");
    }
  });
};

export { sendMail };
