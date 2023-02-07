import { Router } from "express";
import { createUser, findUser, updateUser, deleteUser } from "../controllers/userService";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.get("/findUser", findUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("deleteUser", deleteUser);

export { userRouter };