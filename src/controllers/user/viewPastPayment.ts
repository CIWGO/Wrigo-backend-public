import { Request, Response } from "express";
import  UserPaymentHistory  from "../../models/payment/paymentHistory";

const viewPastPayment = async (req: Request, res: Response) => {
	const uid = req.body;
	try {
		const userPayment = await UserPaymentHistory.findOne({ uid }).exec();
		const invoices = userPayment.invoices;
		return res.status(200).json({ invoices });

	} catch (err) {
		console.log(err);
		return res.status(404).json({ error: "payment history not found" });
	}
};
export default viewPastPayment;