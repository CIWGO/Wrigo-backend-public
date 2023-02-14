// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

import UserModel from "../models/users";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Create one user
const createUser = async (req: Request, res: Response) => {
	const {
		uid,
		username,
		password,
		email,
		isActive,
		isAdmin,
		isSubscribed,
		signup_date,
		email_verified,
	} = req.body;

	const user = new UserModel({
		uid,
		username,
		password,
		email,
		isActive,
		isAdmin,
		isSubscribed,
		signup_date,
		email_verified,
	});

	user.signup_date = new Date(Date.now());
	user.uid = uuidv4();
	user.isActive = true;
	user.isAdmin = false;
	user.isSubscribed = false;
	user.email_verified = false;

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
