import { Router } from "express";
import {
  createUser,
  findUser,
  updateUser,
  deleteUser,
} from "../controllers/userService";
import { login } from "../controllers/userLogin";
import { changePassword } from "../controllers/changePassword";
const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.get("/findUser", findUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("deleteUser", deleteUser);

userRouter.post("/login", login);
userRouter.patch("/changePassword", changePassword);

export { userRouter };
