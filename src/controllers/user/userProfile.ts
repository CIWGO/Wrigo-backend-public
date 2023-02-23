import { userAccount as UserModel } from "../../models/index";
import { Response, Request } from "express";
import { createOperationLog } from "../log/index";

// Revise import path accordingly if necessary
// Divide three functions into three separate files
// Change import userAccount to userProfile as UserModel based on new db structure
// Add user token verification (tokenGuard)

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const showUserProfile = async (req: Request, res: Response) => {
	const { uid, username } = req.params;

	try {
		const user = await UserModel.findOne({ username }).exec();
		if (!user) {
			{
				// create operation log and store it to DB
				createOperationLog(
					true,
					"userAction",
					`User (uid: ${uid}) failed to show profile. User not found`,
					req.userIP,
					req.userDevice,
					uid
				);
				return res.status(404).json({ error: "User not found" });
			}
		} else {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) showed profile.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json(user);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to get user profile, please retry.");
	}
};

const createUserProfile = async (req: Request, res: Response) => {
	const { uid, username } = req.params;
	const { email, country, gender, birthday } = req.body;

	try {
		const user = await UserModel.findOneAndUpdate(
			{ username },
			{ $push: { userProfile: { email, country, gender, birthday } } },
			{ new: true }
		).exec();

		if (!user) {
			{
				// create operation log and store it to DB
				createOperationLog(
					true,
					"userAction",
					`User (uid: ${uid}) failed to create profile. User not found.`,
					req.userIP,
					req.userDevice,
					uid
				);
				return res.status(404).json({ error: "User not found" });
			}
		} else {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) created profile successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(201).send(user);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to create user profile, please try again.");
	}
};

const updateUserProfile = async (req: Request, res: Response) => {
	const { uid, username } = req.params;
	const { email, country, gender, birthday } = req.body;

	try {
		const user = await UserModel.findOneAndUpdate(
			{ username },
			{
				$set: {
					email: email,
					country: country,
					gender: gender,
					birth: birthday,
				},
			},
			{ new: true }
		).exec();

		if (!user) {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) failed to update profile. User not found`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(404).json({ message: "User not found" });
		} else {
			// create operation log and store it to DB
			createOperationLog(
				true,
				"userAction",
				`User (uid: ${uid}) updated profile successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).send(user);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to update user profile" });
	}
};

export { showUserProfile, createUserProfile, updateUserProfile };
