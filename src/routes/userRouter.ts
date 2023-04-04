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
	writingDraft,
	findTopic,
	searchAllTopics,
	searchUserTopics,
	viewPastPayment,
	deleteWritings,
	topicCategoryCounters
} from "../controllers/index";
import { extractUsernameAndPassword, tokenGuard } from "../middlewares/index";

const userRouter = Router();

// router for users model
// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", tokenGuard, deleteUser);
userRouter.post("/sendOTP", sendOTPViaEmail);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/writingDraft", tokenGuard, writingDraft);
userRouter.post("/changePassword", changePassword);
userRouter.post("/viewPastPayment", tokenGuard, viewPastPayment);

// put
userRouter.put("/userProfile", tokenGuard, updateUserProfile);
userRouter.put("/deleteWriting", tokenGuard, deleteWritings);

// get (use post)
userRouter.post("/getUser", getUserAccount);
userRouter.post("/getUserProfile", tokenGuard, showUserProfile);
userRouter.post("/viewHistory", tokenGuard, viewHistory);
userRouter.post("/getTopic", tokenGuard, findTopic);
userRouter.post("/searchAllTopics", tokenGuard, searchAllTopics);
userRouter.post("/searchUserTopics", tokenGuard, searchUserTopics);
userRouter.post("/topicCategoryCounters", topicCategoryCounters);

// delete

// patch
userRouter.patch(
	"/changePassword",
	tokenGuard,
	extractUsernameAndPassword,
	changePassword
);
userRouter.patch("/changeEmail", changeEmail);

// monitor monthly payment

export { userRouter };
