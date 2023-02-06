import { Router } from "express";
import { register, login, test } from "../controllers/user";
import {showUserProfile,createUserProfile,updateUserProfile } from "../controllers/userProfile/userProfile";

const userRouter = Router();

userRouter.post("", register);
userRouter.post("/login", login);

userRouter.post("/test", test);
userRouter.get("/user", showUserProfile);
userRouter.post("/user", createUserProfile);
userRouter.put("/user", updateUserProfile);



export { userRouter };
