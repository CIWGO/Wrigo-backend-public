import UserAccount from "../../models/user/userAccount";
import  PaymentHistory  from "../../models/payment/paymentHistory";
import findEmailByUid from "../../utils/db/findEmailByUid";
import { sendEmail } from "../../utils/ses_sendEmail";

const addSubscribedSince = async (uid) => { 
  const user = await UserAccount.findOne({ uid:uid });
  const userEmail = await findEmailByUid(uid);
  try {
    if (!user.isSubscribed) {
      
      // If the user is a new user, add the current date to the payment collection
      const subscriptionSince = new Date();
      await PaymentHistory.findOneAndUpdate(
        { uid },
        { $set: { subscriptionSince } },
        { new: true }
      );

      await sendEmail(
        [userEmail],
        "Welcome to WRIGO!",
        `Dear customer,

Thank you for subscribing to WRIGO. We're thrilled to have you as a part of our community! We look forward to bringing you the most helpful AI writing tips and resources to guide you through the exam preparation.

Best regards,
The WRIGO Team`
      );
    }
  } catch (err) { 
    console.log("error in set current date to PaymentHistory", err);
  }
  
};

export default addSubscribedSince;