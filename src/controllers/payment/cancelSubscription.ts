import Stripe from "stripe";
import { Response } from "express";

const mySecret = "sk_test_51MltwIKQpmtZsGbpqio4HBGqwWLmRWjidpPnTPVMd63f2A6rBj9zbpka7vGPlvLufcVRa6sw6nQeolxtvaFxQ2hr00prOAKZyi";

// process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(mySecret, {
	apiVersion: "2022-11-15",
});

const cancelSubscription = async (res: Response, subscriptionId: string): Promise<void> => {
	try {
		const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
		console.log("Subscription deleted: ", deletedSubscription);
		res.status(200).send("Subscription canceled successfully");
	} catch (error) {
		console.error("Error canceling subscription: ", error);
		if (error.code === "resource_missing") {
			res.status(404).send("Subscription not found");
		} else if (error.code === "authentication_error") {
			res.status(401).send("Invalid Stripe API key");
		} else {
			res.status(500).send("Failed to cancel subscription");
		}
	}
};

export { cancelSubscription };