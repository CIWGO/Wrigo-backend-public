import UserModel from "../../models/users";
import { Response, Request } from "express";

const showUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await UserModel.findOne({ username }).exec();
  
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
};

const createUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { email, country, gender, birthday } = req.body;
  const user = await UserModel.findOne(
    { username },
    {
      $push: {
        user: { email, country, gender, birthday },
      },
    },
    { new: true }
  ).exec();

  if (!user) return res.sendStatus(404).json({ error: "user not found" });
  res.status(201).send(user);
};

const updateUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { email, country, gender, birthday } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: {
        email: email,
        country: country,
        gender: gender,
        birth: birthday,
      },
    },
    { new: true }
  ).exec();

  if (!user) return res.sendStatus(404).json({ error: "user not found" });
  res.status(200).send(user);
};

export { showUserProfile, createUserProfile, updateUserProfile };
