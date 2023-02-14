import { Router } from "express";
import { createUser } from "../controllers/userSignup";
import { deleteUser } from "../controllers/userDelete";
import { login } from "../controllers/userLogin";
import {
	showUserProfile,
	createUserProfile,
	updateUserProfile,
} from "../controllers/userProfile/userProfile";
import { verifyOtp } from "../controllers/userOtp";
import resetPassword from "../controllers/resetPassword";
import { changePassword } from "../controllers/changePassword";

const userRouter = Router();

// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", deleteUser);
userRouter.post("/userOtp", verifyOtp);
// put
userRouter.put("/userProfile", updateUserProfile);

// get
userRouter.get("/userProfile", showUserProfile);

// delete

// patch
userRouter.patch("/resetPassword", resetPassword);
userRouter.patch("/changePassword", changePassword);


export { userRouter };
