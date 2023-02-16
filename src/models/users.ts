// Code reference: https://mongoosejs.com/docs/typescript.html
import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  uid: string;
  email: string;
  password: string;
  email_verified: boolean;
  OTP?: string;
  username: string;
  signup_date: Date;
  gender?: string;
  birth?: Date;
  country?: string;
  study_field?: string;
  writing_ids?: [string];
  isSubscribed: boolean;
  isAdmin: boolean;
  login_history: [[Date, string]]; // Data format: [[Date, String]]
  isActive: boolean;
  avatar?: string;
}

export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
  hashPassword: () => Promise<void>;
  validatePassword: (password: string) => Promise<void>;
}

const schema: Schema<UserDocument> = new Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email_verified: {
		type: Boolean,
		required: true,
	},
	OTP: {
		type: String,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	signup_date: {
		type: Date,
		required: true,
	},
	gender: {
		type: String,
	},
	birth: {
		type: Date,
	},
	country: {
		type: String,
	},
	study_field: {
		type: String,
	},
	writing_ids: {
		type: [String],
	},
	isSubscribed: {
		type: Boolean,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
	login_history: {
		type: [[Date, String]],
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	avatar: {
		type: String,
	},
});

//Do not declare methods using ES6 arrow functions (=>).
//Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.
schema.methods.hashPassword = async function () {
	// check if password has been hashed
	this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
	bcrypt.compare(password, this.password);
};

const user = model<UserDocument>("User", schema);

export default user;
