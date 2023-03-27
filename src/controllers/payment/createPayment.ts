import { Request, Response, NextFunction } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
	const url = process.env.FRONT_END;
	try {
		const { items, planId } = req.body;

		console.log(items);
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
		next();
	} catch (error) {
		res.status(500).send(error);
	}
};

export default createPayment;
