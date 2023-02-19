// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Create one user
const createUser = async (req: Request, res: Response) => {
	const { uid = uuidv4(), username, password, email } = req.body;

	const user = new UserModel({
		uid,
		username,
		password,
		email,
	});

	try {
		await user.hashPassword();

		const isExist = await UserModel.exists({ username }).exec();

		if (!isExist) {
			await user.save();
			res.status(201).json({ username, email });
		} else {
			res.status(500).send("Username is taken");
		}
	} catch (error) {
		res.status(500).send(error.message || "Failed to sign up, please retry.");
	}
};

export { createUser };
