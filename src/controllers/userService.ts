// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
import UserModel from '../models/users';
import { Request, Response } from "express";

// Create one user
const createUser = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    const user = new UserModel({ username, password, email });
    try {
        await user.save();
        res.status(201).json({ username, email })
        console.log(username);
    } catch (error) {
        let errorMessage = "Failed to create new user";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send(errorMessage);
    }
};

// Find one user
const findUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await UserModel.findOne({ username }).exec();
        const email = user.email;
        res.status(201).json({ email })
    } catch (error) {
        let errorMessage = "User does not exist";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send(errorMessage);
    }
};

// Update one user (incomplete)
const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, newEmail } = req.body;
        const user = await UserModel.findOneAndUpdate(username, newEmail, {
            new: true
        });
        const userUpdated = await UserModel.findOne({ username }).exec();
        const newUserEmail = userUpdated.email;
        res.status(201).json({ newUserEmail });
        console.log(user.username, " + ", userUpdated.email);
    } catch (error) {
        let errorMessage = "Failed to update the user";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send(errorMessage);
    }
};

// Delete one user (incomplete)
const deleteUser = async (req: Request, res: Response) => {
    try {
        const {username } = req.body;
        const user = await UserModel.deleteOne(username);
        console.log(user);
    } catch (error) {
        let errorMessage = "Failed to delete the user";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send(errorMessage);
    }
}

export { createUser, findUser,updateUser, deleteUser };