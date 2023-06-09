import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { createOperationLog } from "../log/index";

/**
 * Get userAccount for the frontend functions. Making request to /getUser will get response
 * with a userAccount json document.
 * @param {Request} req The HTTP request object containing user's username.
 * @param {Response} res The HTTP response object used to send a response to the frontend with a
 * userAccount document in json.
 * @return {Promise<void>} A promise that resolves when the user is fetched successfully from db, 
 * or rejects with an error if the username is not exist.
 * @source url
 */

const getUserAccount = async (req: Request, res: Response) => {
	const { username } = req.body;

	try {
		const user = await UserModel.findOne({ username }).exec();

		if (user) {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User ${username} is fetched.`,
				req.userIP,
				req.userDevice
			);

			// delete the password before response for security.
			user.password = "";

			return res.status(201).json({ message: "User account fetched successful.", user });
		} else {
			return res.status(404).json({ message: "User not found." });
		}

	} catch (error) {
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`Unable to fetch user ${username}).`,
			req.userIP,
			req.userDevice
		);
		return res.status(500).json({ error: error.message || "User is not exist" });
	}
};

export { getUserAccount };