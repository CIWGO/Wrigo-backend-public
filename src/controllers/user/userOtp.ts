import { userOTP } from "../../models/index";
import { sendEmail } from "../../utils/emailNotification";
import otpGenerator from "otp-generator";
import { createOperationLog } from "../log/index";

/**
 * generate a one-time-password(OTP), store it into database and send it to user via email
 * validity of OTP is 1 minute. After this, the OTP will be removed from DB
 * @param {string} uid user id
 * @param {string} email email in user account
 * @param {string} userIP req.userIP
 * @param {string} userDevice req.userDevice
 */
const sendOTPViaEmail = async (uid, email, userIP, userDevice) => {
	// generate an OTP
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
	// find the userOTP using uid, then store otp into the user
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
				}
			)
			.exec();
	}

	// send email
	const emailContent = `Your OTP is ${OTP}. This will expire in 1 minute.`;
	sendEmail(
		"ciwgo-dev@hotmail.com",
		email,
		"CIWGO Email Verification",
		emailContent
	);

	// create operation log and store it to DB
	createOperationLog(
		true,
		"authentication",
		`OTP email sent to user (uid: ${uid}, email: ${email}) successfully.`,
		userIP,
		userDevice,
		uid
	);
};

/**
 * compare if user input and OTP is the same
 * @param {string} uid user id
 * @param {string} OTP the OTP user types in the input box.
 * @return {Promise<boolean>} if user input is the same as the OTP stored in DB, return true
 * Note: the type of this return is Promise, so it should be handled using "then" and "catch" when being used
 */
const verifyOTP = async (uid, OTP, userIP, userDevice): Promise<boolean> => {
	const storedOtp = await userOTP.findOne({ uid }).exec();
	const verificationResult = OTP === storedOtp.OTP;
	// create operation log and store it to DB
	createOperationLog(
		true,
		"authentication",
		`User (uid: ${uid}) OTP verification is ${verificationResult}.`,
		userIP,
		userDevice,
		uid
	);
	return verificationResult;
};

export { sendOTPViaEmail, verifyOTP };
