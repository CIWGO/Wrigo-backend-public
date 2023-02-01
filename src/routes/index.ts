import { Router } from "express";
import { userRouter } from "./user";

const v1Router = Router();

v1Router.use("/users", userRouter);

export { v1Router };
