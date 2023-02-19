// user OTP data definition
import { Schema, model } from "mongoose";

export interface UserOTP {
	uid: string;
	OTP?: string;
}

const schema: Schema<UserOTP> = new Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
	},
	OTP: {
		type: String,
		required: true,
	},
});

const userOTP = model<UserOTP>("UserOTP", schema);

export default userOTP;
