import { Request, NextFunction, Response } from "express";
import UserAccount from "../models/user/userAccount";

const subscriptionGard = async (req: Request, res: Response, next: NextFunction) => {
  const { uid} = req.body;
  try {
    const user = await UserAccount.findOne({ uid }).exec();
    const isSubscribed = user.isSubscribed;
    console.log("isSubscribed:" + isSubscribed); 
    const newReqBody = {
      ...req.body,
      isSubscribed
    };
    req.body = newReqBody;
    next();
  } catch (err) { 
    console.log(err);
    res.status(404).json({ err });
  }
};


export default subscriptionGard;