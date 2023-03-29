import { Request, Response,NextFunction } from "express";
import { Stripe } from "stripe";
import findEmailByUid from "../../utils/db/findEmailByUid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// this middleware has not been tested
const createCustomer = async (req: Request,res:Response, next: NextFunction) => {
	const { uid, planId } = req.body;

	const userEmail = await findEmailByUid(uid);

	try {
		const customer = await stripe.customers.create({
			email: userEmail,
			metadata: {
				uid
			},
		});

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [{
				price: planId,
			}],
			payment_behavior: "default_incomplete",
			expand: ["latest_invoice.payment_intent"],
		});
		const requestBody = {
			...req.body,
			customerId: customer.id,
			subscriptionId: subscription.id,
		};
		req.body = requestBody;
		next();
	} catch (error) {
		console.log("error in create customer middleware");
		return res.status(404);
	}
};

export default createCustomer;
