import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt";
// import { LocalStorage } from "node-localstorage";
import { createOperationLog } from "../log/index";
import findUidByUsername from "../../utils/db/findUidByUsername";

/**
 * Replace the content of this template to the actual comments
 * Returns the status code of login with message, if success generate a token and put it into the local storage and return 200ok
 * @param {string} username
 * @param {string} password
 * @return {string} generate a token and put it into the local storage
 * if no return, corresponding status code and error message
 * @source url
 */

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username }).exec();

		// check if it is a valid user
		if (!user) {
			// create operation log and store it to DB
			createOperationLog(
				false,
				"authentication",
				`User (username: ${username}) failed to log in. User not found.`,
				req.userIP,
				req.userDevice
			);
			return res.status(404).json({ error: "User not found" });
		}

		const uid = await findUidByUsername(username);
		// check if it is a valid password
		const isMatch = await user.validatePassword(password);
		if (!isMatch) {
			// create operation log and store it to DB
			createOperationLog(
				false,
				"authentication",
				`User (uid: ${uid}) failed to log in. Incorrect password.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(404).json({ error: "Incorrect password or username" });
		}

		// check if email is verified
		if (!user.email_verified) {
			// create operation log and store it to DB
			createOperationLog(
				false,
				"authentication",
				`User (uid: ${uid}) failed to log in. This user did not verified email.`,
				req.userIP,
				req.userDevice,
				uid
			);
			// frontend needs to redirect to a verify email page for user
			return res
				.status(401)
				.json({ message: "This user did not verified email", uid, username });
		}

		// check isActivate to determine whether this account is deleted or not
		if (!user.isActive) {
			// create operation log and store it to DB
			createOperationLog(
				false,
				"authentication",
				`User (uid: ${uid}) failed to log in. It is a deleted account.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res
				.status(404)
				.json({ error: "User not found, it is a deleted account" });
		}

		// generate a token, the token is generate based on username
		const payload = {
			username: user.username,
			uid: user.uid,
			email: user.email,
		};
		
		const token = generateToken(payload);

		const userlog={token:token,username:username,uid:user.uid};
		// create operation log and store it to DB
		createOperationLog(
			false,
			"authentication",
			`User (uid: ${uid}) logged in successfully.`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res.status(200).json({ message: "Login successful", ...userlog });
	} catch (error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			false,
			"authentication",
			`User (uid: ${uid}) failed to log in. ${error.message || "Server error"
			}.`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res.status(500).json({ error: error.message || "Server error" });
	}
};

export { login };
