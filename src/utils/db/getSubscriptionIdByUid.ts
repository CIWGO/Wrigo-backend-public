import userPaymentHistory from "../../models/payment/paymentHistory";

const getSubscriptionIdByUid = async (uid) => {
	try {
		const paymentHistory = await userPaymentHistory.findOne({ uid }).exec();
		return (await paymentHistory).subscriptionId;
	} catch (error) {
		console.log("error in getSubscriptionIdByUid", error);
	}

};

export default getSubscriptionIdByUid;