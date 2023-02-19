import UserModel from "../../models/user/userAccount";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt";

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username }).exec();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (!user.validatePassword(password)) {
			return res.status(404).json({ error: "Incorrect password" });
		}

		const payload = { username: user.username };
		const token = generateToken(payload);
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message || "Server error" });
	}
};

export { login };
