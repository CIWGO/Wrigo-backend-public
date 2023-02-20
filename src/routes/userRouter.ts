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
	verifyOtp,
	tokenGuard,
} from "../controllers/index";

const userRouter = Router();

// router for users model
// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/profile", createUserProfile);
// userRouter.post("/userDelete", tokenGuard, deleteUser);
userRouter.post("/userOtp", verifyOtp);

// put
userRouter.put("/userProfile", tokenGuard, updateUserProfile);

// get
userRouter.get("/userProfile", tokenGuard, showUserProfile);

// delete
userRouter.delete("/userDelete", tokenGuard, deleteUser);

// patch
userRouter.patch("/resetPassword", resetPassword);
userRouter.patch("/changePassword", tokenGuard, changePassword);


export { userRouter };
