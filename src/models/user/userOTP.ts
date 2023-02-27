// user OTP data definition
import { Schema, model } from "mongoose";

export interface UserOTP {
	uid: string;
	OTP?: string;
}

const schema: Schema<UserOTP> = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		OTP: {
			type: String,
			required: true,
		},
	},
	{ collection: "user_OTPs" }
);

// any OTP created using this Schema will be removed from DB (user_OTPs model list) automatically after 1 minute
// schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const userOTP = model<UserOTP>("UserOTP", schema);

export default userOTP;
