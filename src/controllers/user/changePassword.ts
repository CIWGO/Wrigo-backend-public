import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
// import { sendEmail } from "../../utils/emailNotification";
import bcrypt from "bcrypt";
import { createOperationLog } from "../log/index";
// import config from "../../../config";

// const TEST_EMAIL = config.TEST_EMAIL;

interface RequestWithLocals extends Request {
	locals: {
		username?: string;
		password?: string;
	};
}

/**
 * @param {RequestWithLocals} RequestWithLocals obj extend from Request, which has a local attribute that has username and password
 * @param {Response} Response from express
 * @return {Response} change password in the database, return with corresponding status code and message
 * @source url
 */
const changePassword = async (req: RequestWithLocals, res: Response) => {
	try {
		const { username, password } = req.body;

		const user = await UserModel.findOne({ username }).exec();
		if (!user) {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (username: ${username}) failed to change password. User not found.`,
				req.userIP,
				req.userDevice
			);
			return res.status(404).json({ error: "User not found" });
		}

		const newPassword = await hashPasswordWithReturn(password);
		// const email = user.email;
		await UserModel.updateOne(
			{ username },
			{ $set: { password: newPassword } }
		);

		// modifiedCount containing the number of modified documents
		// if (result.modifiedCount === 0) {
		// 	// create operation log and store it to DB
		// 	createOperationLog(
		// 		true,
		// 		"userAction",
		// 		`User (username: ${username}) failed to change password. Password not modified.`,
		// 		req.userIP,
		// 		req.userDevice
		// 	);
		// 	return res
		// 		.status(409)
		// 		.json({ error: "Error in changing password, Password not modified." });
		// } else {

		// temporarily commented (too many emails sent will lock the account)
		// const msg = `Hi ${username},\n\nYou recently requested to reset the password for your CIWGO account. `;
		// sendEmail(TEST_EMAIL, email, "Password Changed", msg);

		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (username: ${username}) changed password successfully.`,
			req.userIP,
			req.userDevice
		);
		return res.status(200).json({ message: "Password changed successfully" });
		// }
	} catch (error) {
		const username = req.body.username;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (username: ${username}) failed to change password. ${error.message || "Error changing password"
			}`,
			req.userIP,
			req.userDevice
		);
		return res.status(500).json({ error: error.message || "Error changing password" });
	}
};

/**
 * @param {string} password (un-hashed password)
 * @return {string} hashed password
 */
const hashPasswordWithReturn = async function (password: string) {
	const hashedPassword = await bcrypt.hash(password, 12);
	return hashedPassword;
};

export { changePassword };
