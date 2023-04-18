import { sendEmail } from "../../utils/ses_sendEmail";
import * as fs from "fs";
import * as path from "path";

const sendWelcomeEmail = async (userEmail: string) => {
	const imagePath = path.join(__dirname, "your-image-name.png");
	const imageData = fs.readFileSync(imagePath);
	const imageBase64 = imageData.toString("base64");

	const bodyHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
body {font-family: Arial, sans-serif; margin: 0; padding: 0;}
.container {background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px;}
.header {background-color: #2f71da; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;}
.header img {max-width: 200px;}
.content {padding: 20px; text-align: left;}
.content p {font-size: 16px; line-height: 24px;}
.footer {padding: 20px; text-align: center; font-size: 14px; color: #777;}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
	<img src="https://wrigopublicdownload.s3.ap-southeast-2.amazonaws.com/logo.png" alt="Wrigo Logo">
    </div>
    <div class="content">
      <p>Dear customer,</p>
      <p>Thank you for subscribing to Wrigo. We're thrilled to have you as a part of our community! We look forward to bringing you the most helpful AI writing tips and resources to guide you through the exam preparation.</p>
      <p>Best regards,<br>The Wrigo Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Wrigo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

	await sendEmail(
		[userEmail],
		"Welcome to Wrigo!",
		`Dear customer,

Thank you for subscribing to Wrigo. We're thrilled to have you as a part of our community! We look forward to bringing you the most helpful AI writing tips and resources to guide you through the exam preparation.

Best regards,
The Wrigo Team`,
		bodyHtml
	);
};

export default sendWelcomeEmail;
