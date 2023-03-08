import { Request, Response } from "express";
import { userAccount as UserModel } from "../../models/index";
import { changePassword } from "./changePassword";
import { verifyOTP } from "./userOtp";
import { createOperationLog } from "../log/index";

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
	const { uid, username } = req.body;

	try {
		// Find user in the database
		const user = await UserModel.findOne({ username });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Generate OTP and save it to user document
		// const OTP = await sendOTPViaEmail(req, res);

		// Verify OTP
		const isVerified = await verifyOTP(req, res);

		if (isVerified) {
			// Change password
			await changePassword(req as RequestWithLocals, res);
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) password changed successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
		} else {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) OTP verification failed when resetting password.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(401).send({ error: "Invalid OTP" });
		}
	} catch (error) {
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (uid: ${uid}) failed to reset password. ${error.message || "Unknown error"}`,
			req.userIP,
			req.userDevice,
			uid
		);
		res.status(500).json({ error: error.message || "Failed to reset password" });
	}
};

export { resetPassword };
