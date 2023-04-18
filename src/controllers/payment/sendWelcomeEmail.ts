import { sendEmail } from "../../utils/ses_sendEmail";

const sendWelcomeEmail = async (userEmail: string) => {
	const bodyHtml = `
	<!DOCTYPE html>
	<html>
	<head>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
	<style>
	body {font-family: Arial, sans-serif; margin: 0; padding: 0;}
	.container {background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px;}
	.header {padding: 20px; text-align: center; border-radius: 8px 8px 0 0;}
	.header img {max-width: 200px;}
	.content {padding: 20px; text-align: left; font-family: 'Roboto', sans-serif; color: #000;}
	.content p {font-size: 16px; line-height: 24px;}
	.footer {padding: 0; text-align: center; font-size: 14px; color: #ffffff; background-color: #2f71da;border-radius:  0 0 8px 8px;}
	</style>
	</head>
	<body>
	  <div class="container">
		<div class="header">
		  <img src="https://wrigopublicdownload.s3.ap-southeast-2.amazonaws.com/logo1.png" alt="Wrigo Logo">
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
		"Welcome to Wrigo Infinite!",
		`Dear customer,

Thank you for subscribing to Wrigo. We're thrilled to have you as a part of our community! We look forward to bringing you the most helpful AI writing tips and resources to guide you through the exam preparation.

Best regards,
The Wrigo Team`,
		bodyHtml
	);
};

export default sendWelcomeEmail;
