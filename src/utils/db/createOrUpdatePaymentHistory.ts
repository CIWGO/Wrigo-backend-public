import userPaymentHistory from "@src/models/payment/paymentHistory";

const createOrUpdatePaymentHistory = async (uid, customerId, subscriptionId, latestInvoice) => {
	await userPaymentHistory.findOneAndUpdate(
		{ uid },
		{
			$set: {
				customerId,
				subscriptionId
			},
			$push: {
				invoices: latestInvoice,
			},
		},
		{
			upsert: true, // Create a new document if it doesn't exist
		}
	);
};

export default createOrUpdatePaymentHistory;