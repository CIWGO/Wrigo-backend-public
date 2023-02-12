import { Router } from "express";
import { createUser } from "../controllers/userSignup";
import { login } from "../controllers/userLogin";
import {
	showUserProfile,
	createUserProfile,
	updateUserProfile,
} from "../controllers/userProfile/userProfile";
import resetPassword from "../controllers/resetPassword";

const userRouter = Router();

// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/userProfile", createUserProfile);

// userRouter.post("/resetPassword", resetPassword);

// put
userRouter.put("/userProfile", updateUserProfile);

// get
userRouter.get("/userProfile", showUserProfile);

// delete


// patch
userRouter.patch("/resetPassword", resetPassword);


export { userRouter };
