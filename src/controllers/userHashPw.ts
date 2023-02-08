import UserModel from "../models/users";
import { generateToken } from "../utils/jwt";
import { Response, Request } from "express";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = new UserModel({ username, password });

  await user.hashPassword();
  await user.save();

  const token = generateToken({ id: user.id, username });
  res.status(201).json({ username, token });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username }).exec();
  if (!user) {
    res.status(401).json({ error: "invalid username or password" });
    return;
  }
  if (!user.validatePassword(password)) {
    res.status(401).json({ error: "invalid username or password" });
    return;
  }
  // const token = generateToken({ id: user.id, username });
  const token = generateToken({ id: user.id, username, role: "teacher" }); // roles: []
  res.json({ username, token });
};

const test = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("this is a test function");

  res.json({ username, password });
};

export { register, login, test };
