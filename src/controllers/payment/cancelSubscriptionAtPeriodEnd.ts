import getSubscriptionIdByUid from "../../utils/db/getSubscriptionIdByUid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const cancelSubscriptionAtPeriodEnd = async (uid) => {
	const subscriptionId = await getSubscriptionIdByUid(uid);
	if (subscriptionId) {
		try {
			await stripe.subscriptions.update(subscriptionId, {
				cancel_at_period_end: true,
			});
		} catch (error) {
			console.log("Error updating subscription:", error);
		}
	} else {
		console.log("No subscription found for uid:", uid);
	}
};

export default cancelSubscriptionAtPeriodEnd;