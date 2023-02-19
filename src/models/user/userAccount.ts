// Code reference: https://mongoosejs.com/docs/typescript.html
// user account credential data definition
import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
	uid: string;
	username: string;
	email: string;
	password: string;
	email_verified: boolean;
	isActive: boolean;
	isAdmin: boolean;
	isSubscribed: boolean;
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
	username: {
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
	isActive: {
		type: Boolean,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
	isSubscribed: {
		type: Boolean,
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
