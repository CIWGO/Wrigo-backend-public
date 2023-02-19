import {userAccount as UserModel} from "../../models/index";
import { generateToken } from "../../utils/jwt";
import { Response, Request } from "express";

const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const user = new UserModel({ username, password });

	await user.hashPassword();
	await user.save();

	const token = generateToken({ id: user.id, username });
	res.status(201).json({ username, token });
};

// remove  login function as duplicate from userLogin.ts and rename to user Register.ts

export { register };
