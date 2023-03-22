import { Request, NextFunction } from "express";
import { Stripe } from "stripe";
import findEmailByUid from "../../utils/db/findEmailByUid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// this middleware has not been tested
const createCustomer = async (req: Request, next: NextFunction) => {
	const {id, planId} = req.body;
  
	const userEmail = await findEmailByUid(id);

	try {
		const customer = await stripe.customers.create({
			email: userEmail,
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
			subscriptionId: subscription.id,
		};
		req.body = requestBody;
		next();
	} catch (error) {
		console.log("error in create customer middleware");
	}
};

export default createCustomer;
