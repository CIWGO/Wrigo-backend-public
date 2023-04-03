import UserAccount from "../../models/user/userAccount";
import  PaymentHistory  from "../../models/payment/paymentHistory";

const addSubscribedSince = async (uid) => { 
  const user = await UserAccount.findOne({ uid });
  try {
    if (!user.isSubscribed) {
      // If the user is a new user, add the current date to the payment collection
      const subscriptionSince = new Date();
      await PaymentHistory.findOneAndUpdate(
        { uid },
        { $set: { subscriptionSince } },
        { new: true }
      );
    }
  } catch (err) { 
    console.log("error in set current date to PaymentHistory", err);
  }
  
};

export default addSubscribedSince;