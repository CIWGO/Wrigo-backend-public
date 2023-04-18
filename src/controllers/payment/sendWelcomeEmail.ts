import { sendEmail } from "../../utils/ses_sendEmail";

const sendWelcomeEmail = async (userEmail: string) => {
	const bodyHtml = `
	<!DOCTYPE html>
	<html>
	<head>
	<style>
	body {font-family: Arial, sans-serif; margin: 0; padding: 0;}
	.container {background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px;}
	.header {background-color: #2f71da; padding: 20px; text-align: center;}
	.header h1 {color: #ffffff; margin: 0; font-size: 28px;}
	.content {padding: 20px; text-align: left;}
	.content p {font-size: 16px; line-height: 24px;}
	.footer {padding: 20px; text-align: center; font-size: 14px; color: #777;}
	</style>
	</head>
	<body>
	  <div class="container">
		<div class="header">
		  <h1>Welcome to Wrigo!</h1>
		</div>
		<div class="content">
		  <p>Dear customer,</p>
		  <p>Thank you for subscribing to Wrigo. We're thrilled to have you as a part of our community! We look forward to bringing you the most helpful AI writing tips and resources to guide you through the exam preparation.</p>
		</div>
		<div class="footer">
		  <p>Best regards,<br>The Wrigo Team</p>
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