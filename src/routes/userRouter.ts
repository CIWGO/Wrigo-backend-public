import { Router } from "express";
import { createUser } from "../controllers/userSignup";
import { login } from "../controllers/userLogin";
import {
  showUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/userProfile/userProfile";

const userRouter = Router();

// post
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.post("/user", createUserProfile);

// put
userRouter.put("/user", updateUserProfile);

// get
userRouter.get("/user", showUserProfile);

// delete

export { userRouter };
