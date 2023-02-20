import { userAccount as UserModel } from "../../models/index";
import { Response, Request } from "express";

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
	const { username } = req.params;
	const user = await UserModel.findOne({ username }).exec();

	if (!user) return res.status(404).json({ error: "user not found" });
	res.status(200).json(user);
};

const createUserProfile = async (req: Request, res: Response) => {
	const { username } = req.params;
	const { email, country, gender, birthday } = req.body;
	const user = await UserModel.findOne(
		{ username },
		{
			$push: {
				user: { email, country, gender, birthday },
			},
		},
		{ new: true }
	).exec();

	if (!user) return res.sendStatus(404).json({ error: "user not found" });
	res.status(201).send(user);
};

const updateUserProfile = async (req: Request, res: Response) => {
	const { username } = req.params;
	const { email, country, gender, birthday } = req.body;
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

	if (!user) return res.sendStatus(404).json({ error: "user not found" });
	res.status(200).send(user);
};

export { showUserProfile, createUserProfile, updateUserProfile };
