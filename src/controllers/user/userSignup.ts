import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createOperationLog } from "../log/index";
import { createUserProfile } from "../index";

/**
 * Create new user from signup.
 * @param {Request} req The HTTP request object containing the user's uid, username, password, and email.
 * @param {Response} res The HTTP response object used to send a response to the client.
 * @return {Promise<void>} A promise that resolves when the user creation is successful, or rejects with an error if the user creation fails.
 * @source url：https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
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
			//create new userProfile
			await createUserProfile(uid, username);
	
			const userlog={username:username,uid:user.uid};

			// create operation log and store it to DB
			createOperationLog(
				false,
				"userCreation",
				`User (uid: ${uid}) has been created successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(201).json({ message: "Sign up successful", ...userlog });
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
			return res.status(409).json({message: "Username is taken"});
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
			.json({error: error.message || "Failed to sign up, please retry."});
	}
};

export { createUser };
