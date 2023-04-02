import { Request, Response } from "express";
import { Stripe } from "stripe";
import config from "../../../config";

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const createPayment = async (req: Request, res: Response) => {
	console.log("***create payment start");

	const url = process.env.FRONT_END;

	try {
		const { uid, planId } = req.body;

		// Create a customer with the uid in metadata
		const customer = await stripe.customers.create({
			metadata: {
				uid: uid,
			},
		});

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "subscription",
			customer: customer.id, // Associate the customer with the checkout session
			line_items: [
				{
					price: planId,
					quantity: 1,
				},
			],
			success_url: `${url}/user/paymentSuccess`,
		});

		console.log("***create payment end");
		res.status(200).json({ url: session.url });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export default createPayment;
