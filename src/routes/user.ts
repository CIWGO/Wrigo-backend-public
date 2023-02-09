import { Router } from "express";
import { register, login, test } from "../controllers/userHashPw";
import {showUserProfile,createUserProfile,updateUserProfile } from "../controllers/userProfile/userProfile";

const userRouter = Router();

userRouter.post("", register);
userRouter.post("/login", login);

userRouter.post("/test", test);
userRouter.get("/userProfile", showUserProfile);
userRouter.post("/userProfile", createUserProfile);
userRouter.put("/userProfile", updateUserProfile);



export { userRouter };
