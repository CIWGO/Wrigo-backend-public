import { userAccount } from "../../models/index";
import userPaymentHistory from "@src/models/payment/paymentHistory";
import { Request, Response } from "express";
import findEmailByUid from "@src/utils/db/findEmailByUid";
import { sendEmail } from "../../utils/ses_sendEmail";
import { Stripe } from "stripe";

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

		// send user receipt
		await sendEmail(
			[userEmail],
			"WRIGO - subscription receipt",
			"checkout completed."
		);

		// create payment history, store uid, customer id, subscription id, invoice paid into database, User.isSubscirbed update to true
		const latestInvoice = await stripe.invoices.list({
			subscription: subscriptionId,
			limit: 1, // Only fetch the latest invoice
			status: "paid", // Only fetch paid invoices, change this as needed
		});

		await userPaymentHistory.findOneAndUpdate(
			{ uid },
			{
				$set: {
					customerId,
					subscriptionId
				},
				$push: {
					invoices: latestInvoice.data[0],
				},
			},
			{
				upsert: true, // Create a new document if it doesn't exist
			}
		);

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