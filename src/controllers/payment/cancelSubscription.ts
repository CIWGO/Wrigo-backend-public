import Stripe from "stripe";
import { Request, Response } from "express";

const mySecret = "sk_test_51MltwIKQpmtZsGbpqio4HBGqwWLmRWjidpPnTPVMd63f2A6rBj9zbpka7vGPlvLufcVRa6sw6nQeolxtvaFxQ2hr00prOAKZyi";

// process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(mySecret, {
	apiVersion: "2022-11-15",
});

const cancelSubscription = async (req: Request, res: Response) => {
	try {
		const deletedSubscription = await stripe.subscriptions.del(
			req.body.subscriptionId
		);
    
		res.send({ subscription: deletedSubscription });
	} catch (error) {
		return res.status(400).send({ error: { message: error.message } });
	}
};

export { cancelSubscription };