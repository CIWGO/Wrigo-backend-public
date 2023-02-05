import nodemailer, { SentMessageInfo } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "ciwgo-dev@hotmail.com",
    pass: "Ciwgo123"
  }
});

const message = {
  from: "ciwgo-dev@hotmail.com",
  to: "hnytllftw@gmail.com",
  subject: "Email Notification",
  text: "Hello, this is a test email from nodemailer."
};

transporter.sendMail(message, (error: Error | null, info: SentMessageInfo): void => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.toString());
  }
});


