import userPaymentHistory from "../../models/payment/paymentHistory";

const createOrUpdatePaymentHistory = async (uid, customerId, subscriptionId,paymentMethod, latestInvoice?) => {
	await userPaymentHistory.findOneAndUpdate(
		{ uid },
		{
			$set: {
				customerId: customerId,
				subscriptionId: subscriptionId,
				paymentMethod: paymentMethod
			},
			$push: {
				invoices: latestInvoice,
			},
		},
		{
			upsert: true, // Create a new document if it doesn't exist
		}
	).exec();
};

export default createOrUpdatePaymentHistory;