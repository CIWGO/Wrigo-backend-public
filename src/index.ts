// Index for app entry

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app";
import connectToDB from "./utils/db/dbService";
import { v1Router } from "./routes/index";
import { Request, Response, NextFunction } from "express";

// add 2 customized properties into request
declare module "express" {
	interface Request {
		userDevice?: string;
		userIP?: string;
	}
}

dotenv.config();

const PORT = process.env.PORT;

connectToDB();

/**
 * this is a global middleware. It requires every single request (no matter what type) from users have to get through this function. 
 * User IP and device type will be stored into Request.
 * @param {Request} req request from users
 * @param {Response} res respond to users
 * @param {NextFunction} next including all other functions
 * If you need to use IP and device type in other functions handling request, you can get these by req.userIP and req.userDevice 
 */
app.use((req: Request, _: Response, next: NextFunction) => {
	const ip = req.ip.replace(/^::ffff:/, "");
	req.userIP = ip; // store ip into userIP
	const userDevice = req.headers["user-agent"];
	req.userDevice = userDevice; // store userDevice into userIP
	next();
});

app.use(v1Router);

mongoose.connection.once("open", () => {
	console.log("db is connected");
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
