import { Request, Response } from "express";
import Stripe from "stripe";
import userPaymentHistory from "../../models/payment/paymentHistory";
import { sendEmail } from "../../utils/ses_sendEmail";
import findEmailByUid from "../../utils/db/findEmailByUid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
	console.log("*** handleStripeWebhook start");

	const sig = req.headers["stripe-signature"];
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		console.error(err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	const invoice = event.data.object as Stripe.Invoice;
	const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;
	// eslint-disable-next-line no-case-declarations
	const uid = customer.metadata.uid;

	console.log("webhook uid", uid);

	await updatePaymentHistory(uid, invoice);
	const userEmail = await findEmailByUid(uid);


	// Handle the event based on its type
	switch (event.type) {
		case "invoice.payment_succeeded":
			console.log(`Payment succeeded for invoice ${invoice.id}`);
			// send email to user
			await sendEmail(
				[userEmail],
				"WRIGO - subscription receipt",
				"Monthly payment success."
			);
			break;
		case "invoice.payment_failed":
			console.log(`Payment failed for invoice ${invoice.id}`);
			await sendEmail(
				[userEmail],
				"WRIGO - payment failed",
				"Monthly payment failed."
			);
			// here to call the cancel subscription api
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	res.json({ received: true });
};


const updatePaymentHistory = async (uid, latestInvoice) => {
	await userPaymentHistory.findOneAndUpdate(
		{ uid },
		{
			$push: {
				invoices: latestInvoice,
			},
		},
		{
			upsert: true, // Create a new document if it doesn't exist
		}
	);
};

export default handleStripeWebhook;