import { Router } from "express";
import { register, login, test } from "../controllers/user";

const userRouter = Router();

userRouter.post("", register);
userRouter.post("/login", login);

userRouter.post("/test", test);



export { userRouter };
