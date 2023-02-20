// user payment data definition
import { Schema, model } from "mongoose";

export interface UserPayment {
	payment_id: string;
	uid: string;
	payment_type: string; // visa master amex...
	card_holder_name: string;
	card_number: string;
	expiration_date: string;
	unit?: string;
	street_number: string;
	street_name: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
}

const schema = new Schema<UserPayment>(
	{
		payment_id: {
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
		expiration_date: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
		},
		street_number: {
			type: String,
			required: true,
		},
		street_name: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		postcode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{ collection: "user_payments" }
);

const userPayment = model<UserPayment>("UserPayment", schema);

export default userPayment;
