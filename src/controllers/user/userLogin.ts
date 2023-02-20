import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt";

// Revise import path accordingly if necessary
// Add checking if email is verified if not
// Add checking isActivate if not to determine whether this account is deleted or not

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

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
