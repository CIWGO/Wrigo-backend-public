// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createOperationLog } from "../log/index";

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

// Create one user
const createUser = async (req: Request, res: Response) => {
	const { uid = uuidv4(), username, password, email } = req.body;

	try {
		const user = new UserModel({
			uid,
			username,
			password,
			email,
		});
		await user.hashPassword();

		const isExist = await UserModel.exists({ username }).exec();

		if (!isExist) {
			await user.save();
			// create operation log and store it to DB
			createOperationLog(
				false,
				"userCreation",
				`User (uid: ${uid}) has been created successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(201).json({ username, email });
		} else {
			// create operation log and store it to DB
			createOperationLog(
				false,
				"userCreation",
				`User (uid: ${uid}) creation failed. Username taken.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(409).send("Username is taken");
		}
	} catch (error) {
		// create operation log and store it to DB
		createOperationLog(
			false,
			"userCreation",
			`User (uid: ${uid}) creation failed. ${error.message}`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res
			.status(500)
			.send(error.message || "Failed to sign up, please retry.");
	}
};

export { createUser };
