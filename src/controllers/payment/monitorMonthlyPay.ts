import { Request, Response } from "express";
// import { Stripe } from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-11-15",
// });

// this middleware has not been tested
const monitorMonthlyPay = async (req: Request, res: Response) => {
	const event = req.body;

	try {
		const subscriptionId = event.data.object.subscription;
		const amount = event.data.object.amount_paid;
		const payTime = event.data.object.paid_at;
		// "switch" statement to handle different types of Stripe events received on endpoint
		// checking if "event type" == "invoice.payment_succeeded"
		switch (event.type) {
		case "invoice.payment_succeeded":
			console.log(
				`Payment of ${amount} received for subscription ${subscriptionId} at ${payTime}`
			);
			// break to exit the case
			// default executed when unrecognised event type is received from Stripe
			// break + default = function only handles expected events, and alerts unexpected ones
			break;
		default:
			console.log(`Unhandled event type: ${event.type}`);
		}

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export { monitorMonthlyPay };
