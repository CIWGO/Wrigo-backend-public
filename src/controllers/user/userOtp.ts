import { Response } from "express";
import { userOTP } from "../../models/index";
import { sendEmail } from "../../utils/emailNotification";
import otpGenerator from "otp-generator";

/**
 * generate a one-time-password(OTP), store it into database and send it to user via email
 * validity of OTP is 1 minute. After this, the OTP will be removed from DB
 * @param {string} uid user id
 * @param {string} email email in user account
 */
const sendOTPViaEmail = async (uid: string, email: string, res: Response) => {
	try {
		// generate an OTP
		const OTP = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
		});
		// find the userOTP using uid, then store otp into the user
		const userOtp = await userOTP.findOne({ uid }).exec();
		if (!userOtp) {
			const newUserOtp = new userOTP({ uid, OTP });
			await newUserOtp.save();
		} else {
			await userOTP.findOneAndUpdate(
				{ uid },
				{
					$set: {
						OTP: OTP,
					},
				}
			).exec();
		}

		const emailContent = `Your OTP is ${OTP}. This will expire in 1 minute.`;
		sendEmail(
			"ciwgo-dev@hotmail.com",
			email,
			"CIWGO Email Verification",
			emailContent
		);

		// clean OTP after 1 minute
		setTimeout(async () => {
			await userOTP.findOneAndUpdate(
				{ uid },
				{ $set: { OTP: "" } }
			).exec();
		}, 60000);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "An error occurred while sending OTP via email" });
	}
};

/**
 * compare if user input and OTP is the same
 * @param {string} uid user id
 * @param {string} OTP the OTP user types in the input box.
 * @return {Promise<boolean>} if user input is the same as the OTP stored in DB, return true
 * Note: the type of this return is Promise, so it should be handled using "then" and "catch" when being used
 */
const verifyOTP = async (uid, OTP): Promise<boolean> => {
	const storedOtp = await userOTP.findOne({ uid }).exec();
	return OTP === storedOtp.OTP;
};

export { sendOTPViaEmail, verifyOTP };
