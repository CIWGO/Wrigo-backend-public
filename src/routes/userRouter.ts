import { Router } from "express";
import { createUser } from "../controllers/userSignup";
import { login } from "../controllers/userLogin";

const userRouter = Router();

userRouter.post("/signup", createUser);

userRouter.post("/login", login);

export { userRouter };
