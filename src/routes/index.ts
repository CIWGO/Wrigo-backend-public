import { Router } from "express";
import { userRouter } from "./userRouter";
import { apiRouter } from "./apiRouter";

const v1Router = Router();

// use eg. /users/signup as the endpoint
v1Router.use("/users", userRouter);
v1Router.use("/api", apiRouter);

export { v1Router };
