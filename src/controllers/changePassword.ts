import UserModel from "../models/users";
import { Request, Response } from "express";
import sendEmail from "../utils/emailNotification";

const changePassword = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).exec();
    const email = await findUserEmail(username);

    if (!user) return res.status(404).send("User not found");
    const result = await UserModel.updateOne(
      { username },
      { $set: { password: password } }
    );

    // modifiedCount containing the number of modified documents
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Error in changing password" });
    } else if (result.modifiedCount === 1) {
      const msg = `Hi ${username},\n\nYou recently requested to reset the password for your CIWGO account. `;
      
      sendEmail("ciwgo-dev@hotmail.com", email, "Password Changed", msg);
      
      return res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message || "Error changing password2");
  }
};

const findUserEmail = async (username: string): Promise<string> => {

  // eslint-disable-next-line no-useless-catch
  try {
    const user = await UserModel.findOne({ username }, "email").exec();
    if (!user) throw new Error("User not found");
    return user.email;
  } catch (error) {
    throw error;
  }
};

export { changePassword };
