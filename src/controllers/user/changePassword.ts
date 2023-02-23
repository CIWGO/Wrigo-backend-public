import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/emailNotification";
import bcrypt from "bcrypt";
import { createOperationLog } from "../log/index";

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
		console.log(user.password);
		}

		const newPassword = await hashPasswordWithReturn(password);
		const email = user.email;
		const result = await UserModel.updateOne(
			{ username },
			{ $set: { password: newPassword } }
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

/**
 * @param {string} password (un-hashed password)
 * @return {string} hashed password
 */
const hashPasswordWithReturn = async function (password: string) {
	const hashedPassword = await bcrypt.hash(password, 12);
	return hashedPassword;
};

export { changePassword };
