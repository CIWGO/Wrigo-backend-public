import { Request, Response } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const createPayment = async (req: Request, res: Response) => {
	const url = process.env.FRONT_END;
	try {
		const { planId } = req.body;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "subscription",
			line_items: [
				{
					price: planId,
					quantity: 1,
				},
			],
			success_url: `${url}/user/paymentSuccess`,
		});
		res.status(200).json({ url: session.url });
	} catch (error) {
		res.status(500).send(error);
	}
};

export default createPayment;
