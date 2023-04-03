import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../../config";
import { createPaymentInvoice } from "../../utils/db/createPaymentInvoice";
import createOrUpdatePaymentHistory from "../../utils/db/createOrUpdatePaymentHistory";
import { userAccount as UserModel } from "../../models/index";
import { cancelSubscriptionImmediately } from "./cancelSubscriptionImmediately";
import newToSubscription from "./addSubscribedSince";

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
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	// Handle the event
	if (event.type === "invoice.payment_succeeded") {
		console.log("invoice.payment_succeeded");
		const invoice = event.data.object as Stripe.Invoice;// get invoice
		const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;// get customer from invoice

		const invoiceId = invoice.id;// get invoice id
		const createdDate = new Date(invoice.created * 1000);// get created date
		// get payment method
		const paymentIntent = await stripe.paymentIntents.retrieve(
			invoice.payment_intent as string
		);
		const rawPaymentMethod = await stripe.paymentMethods.retrieve(
			paymentIntent.payment_method as string
		);
		const paymentMethod = `${rawPaymentMethod.card.brand} - ${rawPaymentMethod.card.last4}`;

		const paymentAmount = invoice.amount_due;// get payment amount
		const status = invoice.status;// get invoice status

		const uid = customer.metadata.uid;// get uid
		const customerId = invoice.customer;// get customer id
		const subscriptionId = invoice.subscription;// get subscription id

		const latestInvoice = await createPaymentInvoice(invoiceId, createdDate, paymentMethod, paymentAmount, status);// create latest invoice
		await latestInvoice.save();// save invoice into invoice collection

		console.log("uid", uid);
		console.log("subscriptionId", subscriptionId);
		console.log("latestInvoice", latestInvoice);

		await createOrUpdatePaymentHistory(uid, customerId, subscriptionId, latestInvoice);

		await newToSubscription(uid);
		await UserModel.findOneAndUpdate(
			{ uid },
			{
				$set: {
					isSubscribed: true
				}
			},
		);
		return res.status(200).send();// send 200 to stripe

		// stripe is expected to send automated email to real subscribers
	} else if (event.type === "invoice.payment_failed") {
		const invoice = event.data.object as Stripe.Invoice;// get invoice
		const customer = await stripe.customers.retrieve(invoice.customer.toString()) as Stripe.Customer;// get customer from invoice

		const invoiceId = invoice.id;// get invoice id
		const createdDate = new Date(invoice.created * 1000);// get created date
		// get payment method
		const paymentIntent = await stripe.paymentIntents.retrieve(
			invoice.payment_intent as string
		);
		const rawPaymentMethod = await stripe.paymentMethods.retrieve(
			paymentIntent.payment_method as string
		);
		const paymentMethod = `${rawPaymentMethod.card.brand} - ${rawPaymentMethod.card.last4}`;

		const paymentAmount = invoice.amount_due;// get payment amount
		const status = invoice.status;// get invoice status

		const uid = customer.metadata.uid;// get uid
		const subscriptionId = invoice.subscription;// get subscription id

		const latestInvoice = await createPaymentInvoice(invoiceId, createdDate, paymentMethod, paymentAmount, status);// create latest invoice
		await latestInvoice.save();// save invoice into invoice collection

		await cancelSubscriptionImmediately(uid, subscriptionId, latestInvoice);
		return res.status(200).send();// send 200 to stripe

		// stripe is expected to send automated email to real subscribers
	}
};

export default handleStripeWebhook;
