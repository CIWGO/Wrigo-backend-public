import { Request, Response } from "express";
import PaymentHistory from "../../models/payment/paymentHistory";
import UserAccount from "../../models/user/userAccount";

const getUserPaymentInfo = async (req: Request, res: Response) => { 
  try {
    const { uid} = req.body;
    const user = await UserAccount.findOne({ uid: uid });
    const paymentHistory = await PaymentHistory.findOne({ uid: uid });
    const { subscriptionSince, paymentMethod } = paymentHistory;
    const isSubscribed = user.isSubscribed;
    return res.status(200).json({ subscriptionSince, paymentMethod, isSubscribed });
  } catch (error) { 
    console.log("error in getting user payment info",error);
  }
  
};

export default getUserPaymentInfo;