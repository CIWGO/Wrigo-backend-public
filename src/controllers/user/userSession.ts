import { Request, Response } from "express";
import { validateToken } from "../../utils/jwt";
import { LocalStorage } from "node-localstorage";

// Revise import path accordingly if necessary

/**
 * @param {AuthRequest} AuthRequest a user type AuthRequest which contains username
 * @return {next} store the valid user into payload and call next function.
 */

interface User {
  username: string;
  iat: number; // time the token is generated
  exp: number; // time the token is expired
}

interface AuthRequest extends Request {
  user?: User;
}

// call this middleware for functions that need to be protected by user login token
const tokenGuard = (req: AuthRequest, res: Response, next) => {
	// get the token from localStorage
	const localStorage = new LocalStorage("./local-storage");
	const authorization = localStorage.getItem("token");

	// check if there is a token
	if (!authorization) {
		return res.status(401).json({ error: "missing the authorization header" });
	}

	try {
		// store the the user information in the req.user and pass on to next()
		const payload = validateToken(authorization);
		req.user = payload as User;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

export { tokenGuard };
