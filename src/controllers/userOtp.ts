// import user from "../models/users";
import { Request } from "express";
import { sendEmail } from "../utils/emailNotification";
// import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
// import { authenticator } from "otplib";

/* generateOtp is a function that generates an hash OTP and
 returns the hashOTP as a string， anyone who calls this function
 needs to save OTP into the database
*/
const sendOTPViaEmail = (req: Request): void => {
	const email = req.body.email;
	const code = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});

	const emailContent = `Your OTP is ${code}. This will expire in 1 minute!`;
	sendEmail("ciwgo-dev@hotmail.com", email, "CIWGO Email Verification", emailContent);
	// const salt = await bcrypt.genSalt(10);
	// const hashOTP = await bcrypt.hash(OTP, salt);
	// return hashOTP.toString();
};

// when user signup need to change the isActivate to true
// const verifyOTP = (req: Request, res: Response) => {

// };

export { sendOTPViaEmail };
// export { sendOTPViaEmail, verifyOTP };
