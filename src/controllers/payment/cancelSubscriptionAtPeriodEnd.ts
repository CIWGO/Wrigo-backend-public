import { Request, Response } from "express";
import getSubscriptionIdByUid from "../../utils/db/getSubscriptionIdByUid";
import Stripe from "stripe";
import config from "../../../config";

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

const cancelSubscriptionAtPeriodEnd = async (req: Request, res: Response) => {
	const { uid } = req.body;
	const subscriptionId = await getSubscriptionIdByUid(uid);
	if (subscriptionId) {
		try {
			await stripe.subscriptions.update(subscriptionId, {
				cancel_at_period_end: true,
			});
			res.status(200).json("subscription will be cancelled at period end");
		} catch (error) {
			console.log("Error updating subscription:", error);
		}
	} else {
		console.log("No subscription found for uid:", uid);
	}
};

export default cancelSubscriptionAtPeriodEnd;