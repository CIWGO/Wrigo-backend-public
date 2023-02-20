import { userOTP, userAccount } from "../../models/index";
import { sendEmail } from "../../utils/emailNotification";
import otpGenerator from "otp-generator";

/* generateOtp is a function that generates an hash OTP and
 returns the hashOTP as a string， anyone who calls this function
 needs to save OTP into the database
*/
const sendOTPViaEmail = async (username) => {
	//const { username, email } = req.body;
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
	// find the user using username, then store hashed otp into the user
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
						OTP: "No OTP",
					},
				},
				{ new: true }
			)
			.exec();
	}, 60000);
};

// when user signup need to change the isActivate to true
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
