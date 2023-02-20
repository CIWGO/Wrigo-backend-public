import { Request, Response } from "express";
import { userAccount as User } from "../../models/index";
import { generateOtp } from "./userOtp";
import { sendEmail } from "../../utils/emailNotification";

// Revise import path accordingly if necessary

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const resetPassword = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		// Find user in the database
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}

		// Generate OTP and save it to user document
		const OTP = generateOtp(email);

		// Save OTP to the user document
		user.set({ OTP });
		await user.save();

		// Send the OTP to the user's email address
		const msg = `Your OTP for resetting your password is: ${OTP}`;
		await sendEmail("ciwgo-dev@hotmail.com", email, "Password Reset OTP", msg);

		// Return success response
		res.send({ message: "OTP sent to your email address" });
	} catch (error) {
		res
			.status(500)
			.send({ error: error.message || "Failed to reset password" });
	}
};

export { resetPassword };