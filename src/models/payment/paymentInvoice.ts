import { Schema, model } from "mongoose";

interface Invoice {
  invoiceId: string;
  createdDate: Date;
	paymentMethod: string;
	paymentAmount: number;
}

const invoiceSchema = new Schema<Invoice>({
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
	}
},
{ collection: "payment_invoice" }
);

const InvoiceModel = model<Invoice>("Invoice", invoiceSchema);

export default InvoiceModel;