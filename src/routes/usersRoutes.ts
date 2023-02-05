// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../utils/dbService";
import User from "../models/users";

// Global Config
export const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = (await collections.users!.find({}).toArray()) as unknown as User[];

        res.status(200).send(users);
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send(errorMessage);
    }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users!.findOne(query)) as unknown as User;

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;
        const result = await collections.users!.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new User with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new User.");
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});

// PUT
usersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: User = req.body as User;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.users!.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated User with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});

// DELETE
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});