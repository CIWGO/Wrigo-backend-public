import { Router } from "express";
import {
	createUser,
	getUserAccount,
	login,
	changePassword,
	changeEmail,
	deleteUser,
	createUserProfile,
	showUserProfile,
	updateUserProfile,
	sendOTPViaEmail,
	verifyOTP,
	viewHistory,
} from "../controllers/index";
import { extractUsernameAndPassword, tokenGuard } from "../middlewares/index";

const userRouter = Router();

// router for users model
// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/getUser", getUserAccount);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", tokenGuard, deleteUser);
userRouter.post("/resetPassword/sendOTPViaEmail", sendOTPViaEmail);
userRouter.post("/resetPassword/verifyOTP", verifyOTP);
userRouter.post("/changePassword", changePassword);

// put
userRouter.put("/userProfile", tokenGuard, updateUserProfile);


// get
userRouter.post("/getUserProfile", tokenGuard, showUserProfile);
userRouter.post("/viewHistory", viewHistory);

// delete

// patch

// reset password: /resetPassword/sendOTPViaEmail-->/resetPassword/verifyOTP-->changePassword
userRouter.patch(
	"/changePassword",
	tokenGuard,
	extractUsernameAndPassword,
	changePassword
);
userRouter.patch("/changeEmail", changeEmail);

export { userRouter };
