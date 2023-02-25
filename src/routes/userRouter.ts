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
} from "../controllers/index";
import { extractUsernameAndPassword, tokenGuard } from "../middlewares/index";

const userRouter = Router();

// router for users model
// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", tokenGuard, deleteUser);

// put
// userRouter.put("/userProfile", tokenGuard, updateUserProfile);
userRouter.put("/userProfile", updateUserProfile);

// get
userRouter.post("/getUserProfile", showUserProfile);

// delete

// patch
userRouter.patch("/resetPassword", resetPassword);
userRouter.patch(
	"/changePassword",
	tokenGuard,
	extractUsernameAndPassword,
	changePassword
);

export { userRouter };
