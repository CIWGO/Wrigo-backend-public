// user payment history data definition
import { Schema, model } from "mongoose";
import Invoice from "./paymentInvoice";

export interface UserPaymentHistory {
	uid: string;
	customerId: string;
	subscriptionId: string;
	subscriptionSince: Date;
	invoices: (typeof Invoice)["prototype"]["_id"][];
}

const schema = new Schema<UserPaymentHistory>(
	{
		uid: {
			type: String,
			required: true
		},
		customerId: {
			type: String,
			required: true
		},
		subscriptionId: {
			type: String,
		},
		subscriptionSince: {
			type: Date,
		},
		invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
	},
	{ collection: "payment_histories" }
);

const userPaymentHistory = model<UserPaymentHistory>(
	"UserPaymentHistory",
	schema
);

export default userPaymentHistory;
