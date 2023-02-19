// Delete user is defined as set isActive = false, not deleting the targe user data in database.
import UserModel from "../../models/user/userAccount";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { username, isActive = false } = req.body;
		await UserModel.findOneAndUpdate(
			{ username },
			{
				$set: {
					isActive: isActive,
				},
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
