const { Router } = require("express");
const { register, login, test } = require("../controllers/user");

const userRouter = Router();

userRouter.post("", register);
userRouter.post("/login", login);

userRouter.post("/test", test);

module.exports = userRouter;
