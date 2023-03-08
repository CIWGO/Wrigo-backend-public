import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";
import { createOperationLog } from "../log/index";

// Revise import path accordingly if necessary
// Add user token verification (tokenGuard)

/**
 * Delete user is defined as set isActive = false, not deleting the targe user data in database.
 * @param {Request} req The HTTP request object containing the user's uid.
 * @param {Response} res The HTTP response object used to send a response to the client.
 * @return {Promise<void>} A promise that resolves when the isActive value is set to false, or rejects with an error if the value update fails.
 * @source url： N/A
 */

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { uid } = req.body;
		await UserModel.findOneAndUpdate(
			{ uid },
			{
				$set: { isActive: false },
			},
			{ new: true }
		).exec();

		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (uid: ${uid}) account deleted successfully.`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res.status(204).json({message: "User account is deleted."});
	} catch (error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"userAction",
			`User (uid: ${uid}) failed to delete account. ${error.message || "Unknown error"}`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res
			.status(500)
			.json({
				error: error.message || "Unable to delete your account, please try again."
			});
	}
};

export { deleteUser };
