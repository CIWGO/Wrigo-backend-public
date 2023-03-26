// payment invoice data definition
import { Schema, model } from "mongoose";

export interface Invoice {
	invoiceId: string;
	createdDate: Date;
	paymentMethod: string;
	paymentAmount: number;
	status: string;
}

const invoiceSchema: Schema<Invoice> = new Schema(
	{
		invoiceId: {
			type: String,
			unique: true,
			required: true
		},
		createdDate: {
			type: Date,
			required: true
		},
		paymentMethod: {
			type: String,
			required: true
		},
		paymentAmount: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			required: true
		}
	},
	{ collection: "payment_invoice" }
);

const Invoice = model<Invoice>("Invoice", invoiceSchema);

export default Invoice;