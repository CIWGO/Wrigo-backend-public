// import Stripe from "stripe";
// import { Request, Response } from "express";
import { userAccount } from "../../models/index";
// import findEmailByUid from "../../utils/db/findEmailByUid";
// import { sendEmail } from "../../utils/ses_sendEmail";
// import createOrUpdatePaymentHistory from "../../utils/db/createOrUpdatePaymentHistory";

// process.env.STRIPE_SECRET_KEY
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// 	apiVersion: "2022-11-15",
// });

/**
 * use uid to find the user
 * set isSubscribed
 * @param {string} uid user id
 */
const changeIsSubscribed = async (uid: string, isSubscribed: boolean) => {
	try {
		await userAccount.findOneAndUpdate(
			{ uid },
			{
				$set: { isSubscribed: isSubscribed },
			}
		).exec();
		// const userEmail = await findEmailByUid(uid);

		// await paymentHistory.findOneAndUpdate(
		// 	{ uid },
		// 	{
		// 		$set: {
		// 			customerId: "",
		// 			subscriptionId: ""
		// 		},
		// 	}
		// ).exec();

		// await createOrUpdatePaymentHistory(uid, null, null, latestInvoice);



		// await sendEmail(
		// 	[userEmail],
		// 	"WRIGO - Cancel Subscription notification",
		// 	`Dear customer,

		// 	Your subscription has been cancelled successfully,

		// 	Thank you for your business!

		// 	Best regards,
		// 	WRIGO`
		// );

		// res.send({ subscription: deletedSubscription });
	} catch (error) {
		console.log("error in cancel subscription", error);
	}
};

export { changeIsSubscribed };