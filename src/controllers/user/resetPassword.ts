import { Request, Response } from "express";
import { userAccount as UserModel } from "../../models/index";
import { changePassword } from "./changePassword";
import { sendOTPViaEmail, verifyOTP } from "./userOtp";

interface RequestWithLocals extends Request {
	locals: {
		username?: string;
		password?: string;
	};
}

/**
 * Resets the password of a user by verifying the OTP sent to their email.
 * @param {RequestWithLocals} req The HTTP request object containing the user's email, OTP, and new password.
 * @param {Response} res The HTTP response object used to send a response to the client.
 * @return {Promise<void>} A promise that resolves when the password is reset successfully, or rejects with an error if the password reset fails.
 * @source url： N/A
 */

const resetPassword = async (req: Request, res: Response) => {
	const { username } = req.body;

	try {
		// Find user in the database
		const user = await UserModel.findOne({ username });

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}

		// Generate OTP and save it to user document
		const OTP = await sendOTPViaEmail(user._id, user.email, req.ip, req.headers["user-agent"]);

		// Verify OTP
		const isVerified = await verifyOTP(user._id, OTP, req.ip, req.headers["user-agent"]);

		if (isVerified) {
			// Change password
			await changePassword(req as RequestWithLocals, res);
		} else {
			return res.status(401).send({ error: "Invalid OTP" });
		}
	} catch (error) {
		res.status(500).send({ error: error.message || "Failed to reset password" });
	}
};

export { resetPassword };
