// import { Request, Response } from "express";
import { Request,Response } from "express";
import { Stripe } from "stripe";
// import { userAccount} from "../../models/index";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});


const createPayment = async (req: Request, res: Response) => {
	
	try {
		const { items,planId } = req.body;

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
			success_url: "http://localhost:3000/user/success/success",
			cancel_url: "http://localhost:3000/user/success/cancel",
		});
		res.status(200).json({ url: session.url });
	} catch (error) {
		res.status(500).send(error);
	}
};

export default createPayment;
