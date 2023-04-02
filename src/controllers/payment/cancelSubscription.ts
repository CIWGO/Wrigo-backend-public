import Stripe from "stripe";
import { Request, Response } from "express";
import { paymentHistory, userAccount } from "../../models/index";
import findEmailByUid from "../../utils/db/findEmailByUid";
import { sendEmail } from "../../utils/ses_sendEmail";

// process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const cancelSubscription = async (req: Request, res: Response) => {
	try {
		const {uid} = req.body;
		const userEmail = await findEmailByUid(uid);
		const deletedSubscription = await stripe.subscriptions.del(
			req.body.subscriptionId
		);

		await paymentHistory.findOneAndUpdate(
			{ uid },
			{
				$set: { customerId: "" , subscriptionId: "" },
			}
		).exec();

		await userAccount.findOneAndUpdate(
			{ uid },
			{
				$set: {isSubscribed: false},
			}
		).exec();

		await sendEmail(
			[userEmail],
			"WRIGO - Cancel Subscription notification",
			`Dear customer,

			Your subscription has been cancelled successfully,

			Thank you for your business!

			Best regards,
			WRIGO`
		);
		
		res.send({ subscription: deletedSubscription });
	} catch (error) {
		return res.status(400).send({ error: { message: error.message } });
	}
};

export { cancelSubscription };