import { Schema, model } from "mongoose";

export interface UserOTP {
	uid: string;
	OTP?: string;
	createdAt: Date;
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
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "user_OTPs" }
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const userOTP = model<UserOTP>("UserOTP", schema);

export default userOTP;
