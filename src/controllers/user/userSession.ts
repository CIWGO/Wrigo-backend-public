import { Request, Response } from "express";
import { validateToken } from "../../utils/jwt";

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

interface AuthRequest extends Request {
	user?: any; // You might want to specify the type here. A header, authorization, or just a json type?
}

// call this middleware for functions that need to be protected by user login token
const tokenGuard = (req: AuthRequest, res: Response, next) => {
	const authorization = req.header("Authorization");
	if (!authorization) {
		return res.status(401).json({ error: "missing the authorization header" });
	}

	// valid authorization format: Bearer {token}
	const tokenArray = authorization.split(" ");
	if (tokenArray.length != 2 || tokenArray[0] != "Bearer") {
		return res
			.status(401)
			.json({ error: "invalid authorization header format" });
	}

	try {
		const payload = validateToken(tokenArray[1]);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

// Do you need to return anything for token validating result?

export { tokenGuard };
