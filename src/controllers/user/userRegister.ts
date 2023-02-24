import { userAccount as UserModel } from "../../models/index";
import { generateToken } from "../../utils/jwt";
import { Response, Request } from "express";

// Revise import path accordingly if necessary

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	
	try {
		const user = new UserModel({ username, password });

		await user.hashPassword();
		await user.save();

		const token = generateToken({ id: user.id, username });

		return res.status(201).json({ username, token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message || "Failed to register, please retry" });
	}
};

export { register };
