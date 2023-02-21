import { userOTP, userAccount } from "../../models/index";
import { sendEmail } from "../../utils/emailNotification";
import otpGenerator from "otp-generator";

/**
 * generate a one-time-password(OTP), store it into database and send it to user via email
 * validity of OTP is 1 minute. After this, the OTP will be removed from DB
 * @param {string} username username of user in userAccount
 */
const sendOTPViaEmail = async (username) => {
	//const { username, email } = req.body;
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
	// find the user using username, then store otp into the user
	const user = await userAccount.findOne({ username }).exec();
	const uid = user.uid;
	const email = user.email;
	const userOtp = await userOTP.findOne({ uid }).exec();
	if (!userOtp) {
		const userOtp = new userOTP({ uid, OTP });
		userOtp.save();
	} else {
		await userOTP
			.findOneAndUpdate(
				{ uid },
				{
					$set: {
						OTP: OTP,
					},
				},
				{ new: true }
			)
			.exec();
	}

	const emailContent = `Your OTP is ${OTP}. This will expire in 1 minute.`;
	sendEmail(
		"ciwgo-dev@hotmail.com",
		email,
		"CIWGO Email Verification",
		emailContent
	);

	// clean OTP after 1 minute
	setTimeout(() => {
		userOTP
			.findOneAndUpdate(
				{ uid },
				{
					$set: {
						OTP: "No OTP", // why?
					},
				},
				{ new: true }
			)
			.exec();
	}, 60000);
};

/**
 * compare if user input and OTP is the same
 * @param {string} username username of user in userAccount
 * @param {string} OTP the OTP user types in the input box.
 * @return {boolean} if user input is the same as the OTP stored in DB, return true
 */
const verifyOTP = async (username, OTP): Promise<boolean> => {
	const user = await userAccount.findOne({ username }).exec();
	const uid = user.uid;
	const storedOtp = await userOTP.findOne({ uid }).exec();

	if (OTP === storedOtp.OTP) {
		return true;
	} else {
		return false;
	}
};

export { sendOTPViaEmail, verifyOTP };
