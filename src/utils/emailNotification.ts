import nodemailer, { SentMessageInfo } from "nodemailer";

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
