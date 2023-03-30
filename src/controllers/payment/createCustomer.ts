import { Request, Response,NextFunction } from "express";
import { Stripe } from "stripe";
import findEmailByUid from "../../utils/db/findEmailByUid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});


const createCustomer = async (req: Request,res:Response, next: NextFunction) => {
	const { uid, planId } = req.body;
	console.log("planId: ", planId);
	console.log(uid);
	const userEmail = await findEmailByUid(uid);
	console.log(userEmail);

	try {
		const customer = await stripe.customers.create({
			email: userEmail,
			metadata: {
				uid
			},
		});
		console.log("111");

		console.log("customer : " , customer.id);
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [{
				price: planId,
			}],
			payment_behavior: "default_incomplete",
			// payment_behavior: "allow_incomplete",
			expand: ["latest_invoice.payment_intent"]
		});
		console.log("222");
		const requestBody = {
			...req.body,
			customerId: customer.id,
			subscriptionId: subscription.id,
		};
		console.log("333");
		req.body = requestBody;
		next();
	} catch (error) {
		console.log("error in create customer middleware");
		return res.status(404);
	}
};

export default createCustomer;
