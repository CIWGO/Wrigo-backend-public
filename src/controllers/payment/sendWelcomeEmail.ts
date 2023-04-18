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
.logo {max-width: 150px; margin: 20px auto; display: block;}
.content {padding: 20px; text-align: left; background-color: #f7f7f7; border-radius: 10px;}
.content p {font-size: 16px; line-height: 24px;}
.footer {padding: 20px; text-align: center; font-size: 14px; color: #777;}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Wrigo!</h1>
      <img class="logo" src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 478.32 422.32'%3E%3Cdefs%3E%3Cstyle%3E.cls-1 {fill: url(%23linear-gradient);}.cls-2 {fill: url(%23linear-gradient-3);}.cls-3 {fill: url(%23linear-gradient-2);}%3C/style%3E%3ClinearGradient id='linear-gradient' x1='70.62' y1='45.15' x2='402.23' y2='376.76' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2374cffa'/%3E%3Cstop offset='1' stop-color='%232f71d9'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-2' x1='.44' y1='214.25' x2='.74' y2='214.54' xlink:href='%23linear-gradient'/%3E%3ClinearGradient id='linear-gradient-3' x1='307.1' y1='51.32' x2='446.31' y2='190.53' xlink:href='%23linear-gradient'/%3E%3C/defs%3E%3Cpath class='cls-1' d='m360.34,3.34h0s-1.47-2.6-1.47-2.6H115.03L.92,213.82l-.62,1.17-.05.08,114.87,207.24h241.55l121.65-210.75L360.34,3.34Zm94.08,202.23l-60.72,14.29-25.7-166.82,86.42,152.53Zm-111.39,194.28l-167.96-43.28,199  94-109.04-31.98,152.33Zm-183.24-55.27l-1.27-248.19,213.56,132.42-212.29,115.78Zm214.19-135.58l-202.36-125.47,173.83-59.72,28.52,185.19ZM305.76,18.58l-147.38,50.63-2.49.86-.9-2.1-21.11-49.38h171.88Zm-186.3,11.67l21.72,50.79-99.22,93.94L119.46,30.24Zm21.27,75.78l1.18,231.18L25.29,215.31l115.44-109.29Zm-92.18,159.41l91.36,95.49-19.45,34.25-71.91-129.74Zm87.14,139.05l19.64-34.59,134.22,34.59h-153.86Zm232.54-37.87l26.04-124.05h0s.99-4.75.99-4.75l1.16-.27,53.59-12.61-81.78,141.68Z'/%3E%3Cpath class='cls-3' d='m0,214.69l.29.3.62-1.17-.92.87Z'/%3E%3Cpath class='cls-2' d='m359.83,0l-2.15.74h1.19l1.47,2.59-.51-3.33Zm35.44,237.81l-.99,4.74,2.15-5.02-1.16.27Z'/%3E%3C/svg%3E" alt="Wrigo Logo">
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

