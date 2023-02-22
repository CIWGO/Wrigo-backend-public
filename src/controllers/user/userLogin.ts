import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt";
import { LocalStorage } from "node-localstorage";

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
	const { username, password } = req.body;
	try {
		const user = await UserModel.findOne({ username }).exec();

		// check if it is a valid user
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// check if it is a valid password
		const isMatch = await user.validatePassword(password);
		if (!isMatch) {
			return res.status(404).json({ error: "Incorrect password" });
		}

		// check if email is verified
		if (!user.email_verified) {
			// frontend needs to redirect to a verify email page for user
			return res.status(401).json({ error: "This user did not verified email" });
		}

		// check isActivate to determine whether this account is deleted or not
		if (!user.isActive) {
			return res.status(404).json({ error: "User not found, it is a deleted account" });
		}

		// generate a token, the token is generate based on username
		const payload = { username: user.username };
		const token = generateToken(payload);
		const localStorage = new LocalStorage("./local-storage");
		// Store token in localStorage
		localStorage.setItem("token", token);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message || "Server error" });
	}
};

export { login };
