import { Router } from "express";
import {
	createUser,
	login,
	changePassword,
	resetPassword,
	deleteUser,
	createUserProfile,
	showUserProfile,
	updateUserProfile,
	sendOTPViaEmail,
	verifyOTP,
	tokenGuard,
} from "../controllers/index";

const userRouter = Router();

// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", tokenGuard, deleteUser);
userRouter.post("/sendOTP", sendOTPViaEmail);
userRouter.post("/verifyOTP", verifyOTP);

// put
userRouter.put("/userProfile", tokenGuard, updateUserProfile);

// get
userRouter.get("/userProfile", tokenGuard, showUserProfile);

// delete

// patch
userRouter.patch("/resetPassword", resetPassword);
userRouter.patch("/changePassword", tokenGuard, changePassword);

export { userRouter };
