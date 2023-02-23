import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/emailNotification";
import { createOperationLog } from "../log/index";

// Revise import path accordingly if necessary
// remove findUserEmail as no need to verify existence of email
// Add user token verification when user wants to change password from the user profile page after login
// or force user to use resetPassword even if the user has logged in through email OTP, meaning no change
// needs to be made here.

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const changePassword = async (req: Request, res: Response) => {
	try {
		const { uid, username, password } = req.body;

		const user = await UserModel.findOne({ username }).exec();
		if (!user) {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) failed to change password. User not found.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(404).send("User not found");
		}

		const email = user.email;
		const result = await UserModel.updateOne(
			{ username },
			{ $set: { password: password } }
		);

		// modifiedCount containing the number of modified documents
		if (result.modifiedCount === 0) {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) failed to change password. Password not modified.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res
				.status(404)
				.json({ error: "Error in changing password, Password not modified." });
		} else {
			const msg = `Hi ${username},\n\nYou recently requested to reset the password for your CIWGO account. `;
			sendEmail("ciwgo-dev@hotmail.com", email, "Password Changed", msg);
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) changed password successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json({ message: "Password changed successfully" });
		}
	} catch (error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (uid: ${uid}) failed to change password. ${error.message || "Error changing password2"}`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res.status(500).send(error.message || "Error changing password2");
	}
};

export { changePassword };
