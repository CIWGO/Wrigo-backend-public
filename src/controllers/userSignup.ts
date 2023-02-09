// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

import UserModel from "../models/users";
import { Request, Response } from "express";

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

    user.signup_date =  new Date(Date.now());

	try {
		const isExist = await UserModel.findOne({ username }).exec();

        await user.hashPassword();

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
