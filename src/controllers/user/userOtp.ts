import {userAccount as user, userOTP as otp} from "../../models/index";
import { Response, Request } from "express";
import { sendEmail } from "../../utils/emailNotification";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

/* generateOtp is a function that generates an hash OTP and
 returns the hashOTP as a string， anyone who calls this function
 needs to save OTP into the database
*/
async function generateOtp(email: string) {
	const OTP = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
	});
  
	console.log(OTP);
  
	const text = `Your OTP is ${OTP}`;
	sendEmail("ciwgo-dev@hotmail.com", email, "Email verification", text);
  
	const salt = await bcrypt.genSalt(10);
	const hashOTP = await bcrypt.hash(OTP, salt);

	// save hashOTP to the database
	const newOtp = new otp({ OTP: hashOTP });
	await newOtp.save();
  
	return hashOTP.toString();
}

// when user signup need to change the isActivate to true
async function verifyOtp(req: Request, res: Response) {

	/*
	added a select statement to include only the OTP field in the returned document. 
	added a call to lean() to return plain JavaScript objects instead of Mongoose documents,
	which should make it easier to access the OTP field
	*/
	const OtpHolder = await otp.find({
		email: req.body.email,
	}).select("OTP").lean();
	if (OtpHolder.length === 0 || OtpHolder === undefined) {
		return res.status(400).send("Cannot find the user");
	} else {
		// if users have same otp then choose the latest one
		const rightOtpFind = OtpHolder[OtpHolder.length - 1];

		// compare the OTP from req and database
		if (rightOtpFind !== undefined) {
			const validUser = await bcrypt.compare(req.body.OTP, rightOtpFind.OTP);
			if (validUser) {
				// update the isActivate flag to true for this user
				await user.findOneAndUpdate(
					{ username: req.body.username },
					{ isActivate: true }
				);
				return res.status(200).send("User verification successful.");
			} else {
				return res.status(400).send("Your OTP was wrong.");
			}
		}
	}
}

export { generateOtp,  verifyOtp };
