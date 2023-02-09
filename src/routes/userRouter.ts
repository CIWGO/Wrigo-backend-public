import { Router } from "express";
import { createUser, findUser, updateUser, deleteUser } from "../controllers/userService";
import { register, login, test } from "../controllers/userHashPw";
import {showUserProfile,createUserProfile,updateUserProfile } from "../controllers/userProfile/userProfile";

const userRouter = Router();

userRouter.post("", register);
userRouter.post("/login", login);

userRouter.post("/signup", createUser);
userRouter.get("/findUser", findUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("deleteUser", deleteUser);


userRouter.post("/test", test);
userRouter.get("/userProfile", showUserProfile);
userRouter.post("/userProfile", createUserProfile);
userRouter.put("/userProfile", updateUserProfile);

export { userRouter };
