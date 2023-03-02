import { userAccount } from "../../models/index";
import { Request, Response } from "express";
import { verifyOTP } from "./userOtp";
import { createOperationLog } from "../log/index";

/**
 * Change user email after successful validation of OTP.
 * @param {Request} req The HTTP request object containing the user's uid, OTP, and new email.
 * @param {Response} res The HTTP response object used to send a response to the client.
 * @return {Promise<void>} A promise that resolves when the new email is set successfully, or rejects with an error if the email change fails.
 * @source url： N/A
 */

const changeEmail = async (req: Request, res: Response) => {
	try {
		const { uid, newEmail } = req.body;

		const isVerified = await verifyOTP(req, res);

		if (isVerified) {
			await userAccount.findOneAndUpdate(
				{ uid },
				{
					$set: { email: newEmail },
				},
				{ new: true }
			).exec();

			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) email changed successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json({message: "User email is changed."});
		} else {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) OTP verification failed when changing email.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(401).send({ error: "Invalid OTP" });
		}
	} catch(error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (uid: ${uid}) failed to change email. ${error.message || "Unknown error"}`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res
			.status(500)
			.json({
				error: error.message || "Unable to change email, please try again."
			});
	}
};

export { changeEmail };