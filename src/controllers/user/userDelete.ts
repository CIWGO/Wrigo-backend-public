import {userAccount as UserModel} from "../../models/index";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
	try {
		// Delete user is defined as set isActive = false, not deleting the targe user data in database.
		const { username, isActive = false } = req.body;
		await UserModel.findOneAndUpdate(
			{ username },
			{
				$set: {isActive: isActive},
			},
			{ new: true }
		// remove .exec(), 在Mongoose v5.x版本之后，.exec() 不再是必需的
		);
		res.status(201).send("User account is deleted.");
	} catch (error) {
		res.status(500).send(error.message || "Unable to delete your account, please try again.");
	}
};

export { deleteUser };
