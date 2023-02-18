import UserModel from "../models/users";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";

/**
 * this function takes user's username and password and check
 *     1. if there is such a user in the database,
 *     2. if hashed password match the password in the database
 *     3. find the user's email in the database and check if it has been verified
 * If true, this function will generate a token and put it into the payload and return 200ok
 */

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username }).exec();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isMatch = await user.validatePassword(password);
		if (!isMatch) {
			return res.status(404).json({ error: "Incorrect password" });
		}

		if (!user.email_verified) {
			// frontend needs to redirect to a verify email page for user
			return res
				.status(401)
				.json({ error: "This user did not verified email" });
		}

		const payload = { username: user.username };
		const token = generateToken(payload);
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message || "Server error" });
	}
};

export { login };
