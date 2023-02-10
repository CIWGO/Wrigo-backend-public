import { Router } from "express";
import {
  createUser,
  findUser,
  updateUser,
  deleteUser,
} from "../controllers/userService";
import { login } from "../controllers/userLogin";
import {
  showUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/userProfile/userProfile";

const userRouter = Router();

// post
userRouter.post("/userProfile", createUserProfile);
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
// put
userRouter.put("/updateUser", updateUser);
userRouter.put("/userProfile", updateUserProfile);
// get
userRouter.get("/findUser", findUser);
userRouter.get("/userProfile", showUserProfile);
// delete
userRouter.delete("deleteUser", deleteUser);

export { userRouter };
