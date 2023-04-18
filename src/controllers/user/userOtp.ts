import { Response, Request } from "express";
import { sendEmail } from "../../utils/ses_sendEmail";
import { userOTP, userAccount } from "../../models/index";
import otpGenerator from "otp-generator";
import { createOperationLog } from "../log/index";
import { userAccount as UserModel } from "../../models/index";
// import config from "../../../config";

// const TEST_EMAIL = config.TEST_EMAIL;

/**
 * generate a one-time-password(OTP), store it into database and send it to user via email
 * validity of OTP is 1 minute. After this, the OTP will be removed from DB
 * @param {string} uid user id
 * @param {string} email email in user account
 */
const sendOTPViaEmail = async (req: Request, res: Response) => {
	const { uid, username, newEmail } = req.body;

	try {
		// generate an OTP
		const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
		let email = "";

		// If user is changing email, the otp will be sent to new email. Else the opt will
		// be sent to the email saved in user account. 
		if (newEmail) {
			email = newEmail;
		} else {
			const user = await UserModel.findOne({ username }).exec();
			email = user.email;
		}

		// find the userOTP using uid, then store otp into the user
		await userOTP.findOneAndUpdate(
			{ uid },
			{ $set: { OTP: otp } },
			{ upsert: true, new: true }
		);

		// send email
		const emailContent = `Your verification code is ${otp}. It will expire in 1 minute.`;
		sendEmail(
			//TEST_EMAIL,
			[email],
			"Wrigo - Email Verification",
			emailContent
		);

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
		  <p>Your verification code is ${otp}. It will expire in 1 minute.</p>
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
			[email],
			"Wrigo - Email Verification",
			`Dear customer,

Your verification code is ${otp}. It will expire in 1 minute.

Best regards,
The Wrigo Team`,
			bodyHtml
		);

		// create operation log and store it to DB
		createOperationLog(
			true,
			"authentication",
			`OTP email sent to user (uid: ${uid}, email: ${email}) successfully.`,
			req.userIP,
			req.userDevice,
			uid
		);

		res.status(200).json({ message: "OTP sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

/**
 * compare if user input and OTP are the same, if they are, change email verified into true
 * @param {string} uid user id
 * @param {string} OTP the OTP user types in the input box.
 * @return {Promise<boolean>} if user input is the same as the OTP stored in DB, return true
 * Note: the type of this return is Promise, so it should be handled using "then" and "catch" when being used
 */
const verifyOTP = async (req: Request, res: Response): Promise<boolean> => {
	const { uid, userInput } = req.body;

	try {
		// find OTP from userOTP db
		const userOtpRecord = await userOTP.findOne({ uid });

		// verify OTP
		if (userOtpRecord && userOtpRecord.OTP === userInput) {
			// create log when successful
			const logContent = `Verified OTP for user ${uid}`;
			await createOperationLog(
				false,
				"Verify OTP",
				logContent,
				req.userIP,
				req.userDevice,
				uid
			);
			// find the userOTP using uid, then change email_verified into true
			await userAccount.findOneAndUpdate({ uid }, { email_verified: true });

			res.status(200).json({ message: "OTP verified successfully" });
			return true;
		} else {
			// create log when failed
			const logContent = `Invalid OTP for user ${uid}`;
			await createOperationLog(
				false,
				"Verify OTP",
				logContent,
				req.userIP,
				req.userDevice,
				uid
			);

			res.status(401).json({ message: "Invalid OTP" });
			return false;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Something went wrong" });
		return false;
	}
};

export { sendOTPViaEmail, verifyOTP };
