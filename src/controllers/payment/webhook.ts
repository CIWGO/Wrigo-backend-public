import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../../config";
import { createPaymentInvoice } from "../../utils/db/createPaymentInvoice";
import createOrUpdatePaymentHistory from "../../utils/db/createOrUpdatePaymentHistory";
import { userAccount as UserModel } from "../../models/index";

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = config.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = STRIPE_WEBHOOK_SECRET;

const handleStripeWebhook = async (req: Request, res: Response) => {
	const sig = req.headers["stripe-signature"] as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(req.body.toString("utf8"), sig, endpointSecret);
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Handle the event
	if (event.type === "invoice.payment_succeeded") {
		console.log("invoice.payment_succeeded");
		const invoice = event.data.object as Stripe.Invoice;// get invoice
		const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;// get customer from invoice

		const invoiceId = invoice.id;// get invoice id
		const createdDate = new Date(invoice.created * 1000);// get created date
		// get 
		const paymentIntent = await stripe.paymentIntents.retrieve(
			invoice.payment_intent as string
		);
		const rawPaymentMethod = await stripe.paymentMethods.retrieve(
			paymentIntent.payment_method as string
		);
		const paymentMethod = `${rawPaymentMethod.card.brand} - ${rawPaymentMethod.card.last4}`;
		const paymentAmount = invoice.amount_due;
		const status = invoice.status;

		const uid = customer.metadata.uid;
		const customerId = invoice.customer;
		const subscriptionId = invoice.subscription;

		const latestInvoice = await createPaymentInvoice(invoiceId, createdDate, paymentMethod, paymentAmount, status);
		await latestInvoice.save();

		await createOrUpdatePaymentHistory(uid, customerId, subscriptionId, latestInvoice);

		await UserModel.findOneAndUpdate(
			{ uid },
			{
				$set: {
					isSubscribed: true
				}
			},
		);

		// stripe is expected to send automated email to real subscribers
	} else if (event.type === "invoice.payment_failed") {
		const invoice = event.data.object as Stripe.Invoice;
		const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;

		const invoiceId = invoice.id;
		const createdDate = new Date(invoice.created * 1000);
		const paymentIntent = await stripe.paymentIntents.retrieve(
			invoice.payment_intent as string
		);
		const rawPaymentMethod = await stripe.paymentMethods.retrieve(
			paymentIntent.payment_method as string
		);
		const paymentMethod = `${rawPaymentMethod.card.brand} - ${rawPaymentMethod.card.last4}`;
		const paymentAmount = invoice.amount_due;
		const status = invoice.status;

		const uid = customer.metadata.uid;
		const latestInvoice = await createPaymentInvoice(invoiceId, createdDate, paymentMethod, paymentAmount, status);
		await latestInvoice.save();

		await createOrUpdatePaymentHistory(uid, null, null, latestInvoice);

		await UserModel.findOneAndUpdate(
			{ uid },
			{
				$set: {
					isSubscribed: false
				}
			},
		);
	}

	// stripe is expected to send automated email to real subscribers
};

export default handleStripeWebhook;

// import { Request, Response } from "express";
// import Stripe from "stripe";
// import userPaymentHistory from "../../models/payment/paymentHistory";
// import { sendEmail } from "../../utils/ses_sendEmail";
// import findEmailByUid from "../../utils/db/findEmailByUid";
// import config from "../../../config";

// const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY;
// const STRIPE_WEBHOOK_SECRET = config.STRIPE_WEBHOOK_SECRET;

// const stripe = new Stripe(STRIPE_SECRET_KEY, {
// 	apiVersion: "2022-11-15",
// });

// export const handleStripeWebhook = async (req: Request, res: Response) => {
// 	console.log("*** handleStripeWebhook start");

// 	const sig = req.headers["stripe-signature"];
// 	const endpointSecret = STRIPE_WEBHOOK_SECRET;

// 	let event: Stripe.Event;

// 	try {
// 		event = stripe.webhooks.constructEvent(req.body.toString(), sig, endpointSecret);
// 	} catch (err) {
// 		console.error(err.message);
// 		return res.status(400).send(`Webhook Error: ${err.message}`);
// 	}

// 	const invoice = event.data.object as Stripe.Invoice;
// 	const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;
// 	const uid = customer.metadata.uid;

// 	console.log("webhook uid", uid);

// 	await updatePaymentHistory(uid, invoice);
// 	const userEmail = await findEmailByUid(uid);


// 	// Handle the event based on its type
// 	switch (event.type) {
// 		case "invoice.payment_succeeded":
// 			console.log(`Payment succeeded for invoice ${invoice.id}`);
// 			// send email to user
// 			await sendEmail(
// 				[userEmail],
// 				"WRIGO - subscription receipt",
// 				"Monthly payment success."
// 			);
// 			break;
// 		case "invoice.payment_failed":
// 			console.log(`Payment failed for invoice ${invoice.id}`);
// 			await sendEmail(
// 				[userEmail],
// 				"WRIGO - payment failed",
// 				"Monthly payment failed."
// 			);
// 			// here to call the cancel subscription api
// 			break;
// 		default:
// 			console.log(`Unhandled event type ${event.type}`);
// 	}

// 	res.json({ received: true });
// };


// const updatePaymentHistory = async (uid, latestInvoice) => {
// 	await userPaymentHistory.findOneAndUpdate(
// 		{ uid },
// 		{
// 			$push: {
// 				invoices: latestInvoice,
// 			},
// 		},
// 		{
// 			upsert: true, // Create a new document if it doesn't exist
// 		}
// 	);
// };

// export default handleStripeWebhook;