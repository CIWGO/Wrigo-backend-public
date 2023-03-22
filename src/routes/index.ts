import { Router } from "express";
import { userRouter } from "./userRouter";
import { apiRouter } from "./apiRouter";
import { Request, Response } from "express";

const v1Router = Router();

// use eg. /users/signup as the endpoint
v1Router.use("/users", userRouter);
v1Router.use("/api", apiRouter);
v1Router.get("/", async (_req: Request, res: Response) => {

	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now()
	};
	try {
		res.status(200).send(healthCheck);
	} catch (error) {
		healthCheck.message = error;
		res.status(503).send(healthCheck);
	}
});

export { v1Router };