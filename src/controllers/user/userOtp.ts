import { Response, Request } from "express";
import { userOTP } from "../../models/index";
import { sendEmail } from "../../utils/emailNotification";
import otpGenerator from "otp-generator";
import { createOperationLog } from "../log/index";
import { userAccount as UserModel } from "../../models/index";
import config from "../../../config";

const TEST_EMAIL = config.TEST_EMAIL;

/**
 * generate a one-time-password(OTP), store it into database and send it to user via email
 * validity of OTP is 1 minute. After this, the OTP will be removed from DB
 * @param {string} uid user id
 * @param {string} email email in user account
 */
const sendOTPViaEmail = async (req: Request, res: Response) => {
	const { uid, username } = req.body;

	try {
		// generate an OTP
		const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
		const user = await UserModel.findOne({ username }).exec();
		const email = user.email;

		// find the userOTP using uid, then store otp into the user
		await userOTP.findOneAndUpdate({ uid }, { OTP: otp }, { upsert: true, new: true });

		// send email
		const emailContent = `Your OTP is ${otp}. This will expire in 1 minute.`;
		sendEmail(
			TEST_EMAIL,
			email,
			"CIWGO Email Verification",
			emailContent
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
 * compare if user input and OTP is the same
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
				logContent, req.userIP,
				req.userDevice,
				uid
			);

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
