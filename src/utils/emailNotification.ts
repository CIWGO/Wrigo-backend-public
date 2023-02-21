import nodemailer from "nodemailer";
import config from "../../config";

const TEST_EMAIL = config.TEST_EMAIL;
const TEST_EMAIL_PASSWORD = config.TEST_EMAIL_PASSWORD;

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,
	secure: false,
	auth: {
		user: TEST_EMAIL,
		pass: TEST_EMAIL_PASSWORD,
	},
});

// To call sendEmail func and pass in data:
// sendEmail('from@example.com', 'to@example.com', 'Email subject', 'Email text');
const sendEmail = (
	from: string,
	to: string,
	subject: string,
	text: string
): void => {
	const email = {
		from,
		to,
		subject,
		text,
	};

	transporter.sendMail(
		email,
		(error: Error | null): void => {
			if (error) {
				console.log(error);
			} else {
				console.log(`Verification code sent to ${to} at ${new Date(Date.now())}`);
			}
		}
	);
};

export { sendEmail };
