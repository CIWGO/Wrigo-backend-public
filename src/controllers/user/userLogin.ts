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

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username }).exec();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (!user.validatePassword(password)) {
			return res.status(404).json({ error: "Incorrect password" });
		}

		const payload = { username: user.username };
		const token = generateToken(payload);
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message || "Server error" });
	}
};

export { login };
