// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
import UserModel from "../models/users";
import { Request, Response } from "express";

// Create one user
const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const user = new UserModel({ username, password, email });
  try {
    await user.save();
    res.status(201).json({ username, email });
    console.log(username);
  } catch (error) {
    res
      .status(500)
      .send(error.message || { error: "Failed to create new user" });
  }
};

// Find one user
const findUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({ username }).exec();
    const email = user.email;
    res.status(201).json({ email });
  } catch (error) {
    res.status(500).send(error.message || "User does not exist");
  }
};

// Update one user (incomplete)
const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, newEmail } = req.body;
    const user = await UserModel.findOneAndUpdate(username, newEmail, {
      new: true,
    });
    const userUpdated = await UserModel.findOne({ username }).exec();
    const newUserEmail = userUpdated.email;
    res.status(201).json({ newUserEmail });
    console.log(user.username, " + ", userUpdated.email);
  } catch (error) {
    res.status(500).send(error.message || "Failed to update user");
  }
};

// Delete one user (incomplete)
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await UserModel.deleteOne(username);
    console.log(user);
  } catch (error) {
    res.status(500).send(error.message || "Failed to delete user");
  }
};

export { createUser, findUser, updateUser, deleteUser };
