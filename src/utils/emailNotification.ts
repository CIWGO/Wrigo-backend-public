import nodemailer, { SentMessageInfo } from "nodemailer";

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
		user: "ciwgo-dev@hotmail.com",
		pass: "Ciwgo123",
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
		(error: Error | null, info: SentMessageInfo): void => {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.toString());
			}
		}
	);
};

export { sendEmail };
