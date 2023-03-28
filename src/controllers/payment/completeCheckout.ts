import { userAccount } from "../../models/index";
import { Request, Response } from "express";
import findEmailByUid from "../../utils/db/findEmailByUid";
import { sendEmail } from "../../utils/ses_sendEmail";
import { Stripe } from "stripe";
import createOrUpdatePaymentHistory from "../../utils/db/createOrUpdatePaymentHistory";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const completeCheckout = async (req: Request, res: Response) => {
	/*
		1. Send receipt to user by email
		2. Store customer id, subscription id, invoice paid into database,
		User.isSubscirbed update to true
	*/
	const { uid, customerId, subscriptionId } = req.body;

	try {
		// Send receipt to user by email
		const userEmail = await findEmailByUid(uid);
		const latestInvoiceArray = await stripe.invoices.list({
			subscription: subscriptionId,
			limit: 1, // Only fetch the latest invoice
			status: "paid", // Only fetch paid invoices, change this as needed
		});

		// send user receipt
		await sendEmail(
			[userEmail],
			"WRIGO - subscription receipt",
			`checkout completed. Receipt: ${latestInvoiceArray.data[0]}`
		);

		// create payment history, store uid, customer id, subscription id, invoice paid into database, User.isSubscirbed update to true
		await createOrUpdatePaymentHistory(uid, customerId, subscriptionId, latestInvoiceArray.data[0]);

		await userAccount.findOneAndUpdate(
			{ uid },
			{
				$set: { isSubscribed: true },
			}
		).exec();

		res.status(200).json("checkout completed");
	} catch (error) {
		console.log("error in checkout completion");
	}
};

export default completeCheckout;