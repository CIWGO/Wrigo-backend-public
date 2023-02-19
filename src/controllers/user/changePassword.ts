import {userAccount as UserModel} from "../../models/index";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/emailNotification";

// remove findUserEmail as no need to verify exsitence of email

const changePassword = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		const user = await UserModel.findOne({ username }).exec();
		if (!user) return res.status(404).send("User not found");

		const email = user.email;
		const result = await UserModel.updateOne(
			{ username },
			{ $set: { password: password } }
		);

		// modifiedCount containing the number of modified documents
		if (result.modifiedCount === 0) {
			return res.status(404).json({ error: "Error in changing password, Password not modified." });
		} else {
			const msg = `Hi ${username},\n\nYou recently requested to reset the password for your CIWGO account. `;
			sendEmail("ciwgo-dev@hotmail.com", email, "Password Changed", msg);

			return res.status(200).json({ message: "Password changed successfully" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message || "Error changing password2");
	}
};

export { changePassword };
