// import { userAccount } from "../../models/index";
import { Request, Response } from "express";
import findEmailByUid from "../../utils/db/findEmailByUid";
import { sendEmail } from "../../utils/ses_sendEmail";
import { Stripe } from "stripe";
// import createOrUpdatePaymentHistory from "../../utils/db/createOrUpdatePaymentHistory";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

const completeCheckout = async (req: Request, res: Response) => {
	console.log("***complete checkout start");
	console.log("Request URL:", req.url);
	console.log("Request Method:", req.method);
	console.log("Request Body:", req.body);

	/*
		1. Send receipt to user by email
		2. Store customer id, subscription id, invoice paid into database,
		User.isSubscirbed update to true
	*/
	const { uid, subscriptionId } = req.body;

	try {
		// Send receipt to user by email
		const userEmail = await findEmailByUid(uid);

		// console.log("stripe", stripe);
		// console.log("stripe invoices", stripe.invoices);

		const latestInvoiceArray = await stripe.invoices.list({
			subscription: subscriptionId,
			limit: 1, // Only fetch the latest invoice
			status: "paid", // Only fetch paid invoices, change this as needed
		});
		const latestInvoice = latestInvoiceArray.data[0];

		console.log("latestInvoice", latestInvoice);

		console.log("before send email");


		// send user receipt
		await sendEmail(
			[userEmail],
			"WRIGO - subscription successful",
			`Dear customer,

Thank you for your payment. Here are the details of your invoice: ${latestInvoice},

Thank you for your business!

Best regards,
WRIGO`
		);

		// create payment history, store uid, customer id, subscription id, invoice paid into database, User.isSubscirbed update to true
		// await createOrUpdatePaymentHistory(uid, customerId, subscriptionId, latestInvoice);

		// await userAccount.findOneAndUpdate(
		// 	{ uid },
		// 	{
		// 		$set: { isSubscribed: true },
		// 	}
		// ).exec();

		console.log("***complete checkout end");

		res.status(200).json("checkout completed");
	} catch (error) {
		console.log("error in checkout completion", error);
	}
};

export default completeCheckout;
