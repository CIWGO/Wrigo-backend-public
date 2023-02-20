import { userAccount as UserModel } from "../../models/index";
import { Request, Response } from "express";

// Revise import path accordingly if necessary
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

const deleteUser = async (req: Request, res: Response) => {
	try {
		// Delete user is defined as set isActive = false, not deleting the targe user data in database.
		const { username, isActive = false } = req.body;
		await UserModel.findOneAndUpdate(
			{ username },
			{
				$set: { isActive: isActive },
			},
			{ new: true }
		).exec();
		res.status(201).send("User account is deleted.");
	} catch (error) {
		res
			.status(500)
			.send(
				error.message || "Unable to delete your account, please try again."
			);
	}
};

export { deleteUser };
