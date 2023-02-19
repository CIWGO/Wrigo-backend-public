// user payment history data definition
import { Schema, model } from "mongoose";

export interface UserPaymentHistory {
	transaction_id: string;
	uid: string;
	payment_type: string; // visa master amex...
	card_holder_name: string;
	card_number: string;
	payment_amount: number;
	payment_time: Date;
	purchase_description: string; // name of purchased service
}

const schema = new Schema<UserPaymentHistory>({
	transaction_id: {
		type: String,
		required: true,
		unique: true,
	},
	uid: {
		type: String,
		required: true,
	},
	payment_type: {
		type: String,
		required: true,
	},
	card_holder_name: {
		type: String,
		required: true,
	},
	card_number: {
		type: String,
		required: true,
	},
	payment_amount: {
		type: Number,
		required: true,
	},
	payment_time: {
		type: Date,
		required: true,
	},
	purchase_description: {
		type: String,
		required: true,
	},
});

const userPaymentHistory = model<UserPaymentHistory>(
	"UserPaymentHistory",
	schema
);

export default userPaymentHistory;
