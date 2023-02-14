import user from "../models/users";
import { Response, Request } from "express";
import { sendEmail } from "../utils/emailNotification";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

/* generateOtp is a function that generates an hash OTP and
 returns the hashOTP as a string， anyone who calls this function
 needs to save OTP into the database
*/
export async function generateOtp(email: string) {
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
	console.log(OTP);
	const text = `Your OTP is ${OTP}`;
	sendEmail("ciwgo-dev@hotmail.com", email, "Email verification", text);
	const salt = await bcrypt.genSalt(10);
	const hashOTP = await bcrypt.hash(OTP, salt);
	return hashOTP.toString();
}

// when user signup need to change the isActivate to true
const verifyOtp = async (req: Request, res: Response) => {
	const OtpHolder = await user.find({
		username: req.body.username,
	});
	if (OtpHolder.length !== 0 && OtpHolder !== undefined) {
		return res.status(400).send("Cannot find the user");
	} else {
		// if users have same otp then choose the latest one
		const rightOtpFind = OtpHolder[OtpHolder.length - 1];

		// compare the OTP from req and database
		if (rightOtpFind !== undefined) {
			const validUser = await bcrypt.compare(req.body.OTP, rightOtpFind.OTP);
			if (validUser) {
				return res.status(200).send("User verify successful.");
			} else {
				return res.status(400).send("Your OTP was wrong.");
			}
		}
	}
};

export { verifyOtp };
