import { Request, Response } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// this middleware has not been tested
const monitorMonthlyPay = async (req: Request, res: Response) => {

	try {
		const stripeEvent = req.body as Stripe.Event;
		const subscriptionId = stripeEvent.data.object.subscription as string;
		const amount = stripeEvent.data.object.amount_paid as number;
		const payTime = stripeEvent.data.object.paid_at as number;
		// "switch" statement to handle different types of Stripe events received on endpoint
		// checking if "event type" == "invoice.payment_succeeded"
		switch (stripeEvent.type) {
		case "invoice.payment_succeeded":
			console.log(
				`Payment of ${amount} received for subscription ${subscriptionId} at ${payTime}`
			);
			// break to exit the case
			break;
		case "invoice.payment_failed":
			console.log(`Payment failed for subscription ${subscriptionId} at ${payTime}`)
			// break to exit the case
			// default executed when unrecognised event type is received from Stripe
			// break + default = function only handles expected events, and alerts unexpected ones
			break;
		default:
			console.log(`Unhandled event type: ${event.type}`);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export { monitorMonthlyPay };
