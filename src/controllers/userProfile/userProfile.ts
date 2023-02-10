import UserModel from "../../models/users";
import { Response, Request } from "express";

const showUserProfile = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = await UserModel.findOne({ username }).exec();

  if (!user) return res.status(404).json({error:"user not found"});
  res.status(200).json(user);
}; 

const createUserProfile = async (req: Request, res: Response) => {
  const { username, country, birth, gender, study_field } = req.body;
  
  const user = await UserModel.findOneAndUpdate({ username }, {
    $set: {
      country,gender,birth,study_field
    },
  },
    { upsert: true, new: true },).exec();
  
  if (!user) return res.sendStatus(404);
  res.status(201).send(user);
};

const updateUserProfile = async (req: Request, res: Response) => { 
  const { username, country, birth, gender, study_field } = req.body;
  
  const user = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: {
        country,gender,birth,study_field
      },
    },
    { upsert: true, new: true },
  ).exec();

  if (!user) return res.sendStatus(404);
  res.status(200).send(user);                                                                                                                                             
};

export { showUserProfile, createUserProfile, updateUserProfile };
