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
	// remove login function as duplicate from userLogin.ts
	const { username, password } = req.body;
	const user = new UserModel({ username, password });

	await user.hashPassword();
	await user.save();
	// import userJWT as UserModel for saving JWT token to db?
	const token = generateToken({ id: user.id, username });
	res.status(201).json({ username, token });
};

// rename this file and function to accurately reflect the purpose

export { register };
