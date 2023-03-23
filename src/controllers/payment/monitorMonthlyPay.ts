import { Request, Response } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// this middleware has not been tested
const monitorMonthlyPay = async (req: Request, res: Response) => {
	// receive payment data from Stripe API
	const stripeEvent = req.body;
	// check subscriptionId, amount and payTime for payment_succeeded and payment_failed
	try {
		const subscriptionId = stripeEvent.data.object.subscription;
		const amount = stripeEvent.data.object.amount_paid;
		const payTime = stripeEvent.data.object.paid_at;
		// "switch" statement to handle different types of Stripe events received on endpoint
		// checking if "event type" == "invoice.payment_succeeded"
		switch (stripeEvent.type) {
		case "invoice.payment_succeeded":
			// TODO: Send email notification to user about successful payment
			console.log(
				`Payment of ${amount} received for subscription ${subscriptionId} at ${payTime}`
			);
			// break to exit the case
			// default executed when unrecognised event type is received from Stripe
			// break + default = function only handles expected events, and alerts unexpected ones
			break;
		case "invoice.payment_failed":
			// TODO: Send email notification to user about payment failure
			console.log(
				`Payment of ${amount} for subscription ${subscriptionId} failed at ${payTime}`
			);
			break;
		default:
			console.log(`Unhandled event type: ${stripeEvent.type}`);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export { monitorMonthlyPay };
