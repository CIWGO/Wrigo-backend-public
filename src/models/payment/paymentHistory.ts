// user payment history data definition
import { Schema, model } from "mongoose";
import  InvoiceModel  from "./paymentInvoice";

export interface UserPaymentHistory {
	userId: string;
	customerId: string;
	subscriptionId: string;
  invoices: (typeof InvoiceModel)["prototype"]["_id"][];
}

const schema = new Schema<UserPaymentHistory>(
	{
		userId: {
			type: String,
			required: true
		},
		customerId: {
			type: String,
			required: true
		},
		subscriptionId: {
			type: String,
			required: true
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
