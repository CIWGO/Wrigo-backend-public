import UserModel from "../models/users";
import { Request, Response } from "express";
import { sendEmail } from "../utils/emailNotification";
import otpGenerator from "otp-generator";

/* generateOtp is a function that generates an hash OTP and
 returns the hashOTP as a string， anyone who calls this function
 needs to save OTP into the database
*/
const sendOTPViaEmail = async (req: Request, res: Response) => {
	const { username, email } = req.body;
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
	// find the user using username, then store hashed otp into the user
	const user = await UserModel.findOne({ username }).exec();
	user.OTP = OTP;
	user.save();
	// clean OTP after 1 minute
	setTimeout(() => {
		user.OTP = "";
		user.save();
	}, 60000);
	const emailContent = `Your OTP is ${OTP}. This will expire in 1 minute!`;
	sendEmail("ciwgo-dev@hotmail.com", email, "CIWGO Email Verification", emailContent);
	return res.status(200).json({ message: "Email has been sent" });
};

// when user signup need to change the isActivate to true
const verifyOTP = async (req: Request, res: Response) => {
	const { username, email, userInput } = req.body;
	const user = await UserModel.findOne({ username }).exec();
	if (userInput === user.OTP) {
		user.email = email;
		user.email_verified = true;
		user.save();
		return res.status(200).json({ message: "Email verification successful" });
	} else {
		return res.status(404).json({ error: "Incorrect or invalid code!" });
	}
};

export { sendOTPViaEmail, verifyOTP };
