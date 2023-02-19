import { Router } from "express";
import { createUser } from "../controllers/user/userSignup";
import { deleteUser } from "../controllers/user/userDelete";
import { login } from "../controllers/user/userLogin";
import {
	showUserProfile,
	createUserProfile,
	updateUserProfile,
} from "../controllers/user/userProfile";
import { verifyOtp } from "../controllers/user/userOtp";
import { resetPassword } from "../controllers/user/resetPassword";
import { changePassword } from "../controllers/user/changePassword";
import { tokenGuard } from "../controllers/user/userSession";

const userRouter = Router();

// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/userDelete", tokenGuard, deleteUser);
userRouter.post("/userOtp", verifyOtp);

// put
userRouter.put("/userProfile", tokenGuard, updateUserProfile);

// get
userRouter.get("/userProfile", tokenGuard, showUserProfile);

// delete

// patch
userRouter.patch("/resetPassword", resetPassword);
userRouter.patch("/changePassword", tokenGuard, changePassword);


export { userRouter };
