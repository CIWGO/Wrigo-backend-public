import { userProfile as UserModel } from "../../models/index";
import { Response, Request } from "express";
import { createOperationLog } from "../log/index";

// Revise import path accordingly if necessary
// Divide three functions into three separate files
// Change import userAccount to userProfile as UserModel based on new db structure
// Add user token verification (tokenGuard)

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {string} uid Uid is the request body for crud requests.
 * @return {json} user User data are returned by 3 crud functions,which contains the date from user profile. 
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const showUserProfile = async (req: Request, res: Response) => {
	const { uid } = req.body;

	try {
		const user = await UserModel.findOne({ uid }).exec();
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
			return res.status(200).json({message: "User showed profile successful", user});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({error: error.message ||"Failed to get user profile, please retry."});
	}
};

const createUserProfile = async (uid, username) => {
	try {
		const user = await UserModel.findOne({ uid });
		if (user) {
			throw new Error("User already exists");
		} else {
			
			const newUser = new UserModel({ uid, username, country: "", birth: undefined, gender: "", study_field: "" });
			await newUser.save();
			return newUser;
		}


	} catch (error) {
		throw new Error(error.message || "Failed to create user profile");
	}
	
};

const updateUserProfile = async (req: Request, res: Response) => {
	const {uid, country, birth, gender, study_field } = req.body;

	try {
		const user = await UserModel.findOneAndUpdate(
			{ uid },
			{
				$set: {
					country,gender,birth,study_field
				},
			},
			{ upsert: true, new: true },
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
			return res.status(404).json({ error: "User not found" });
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
			return res.status(200).json(user);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message || "Failed to update user profile" });
	}
};

export { showUserProfile, createUserProfile, updateUserProfile };
