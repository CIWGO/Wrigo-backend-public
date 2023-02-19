// user profile data definition
import { Schema, model } from "mongoose";

export interface UserProfile {
	uid: string;
	username: string;
	avatar?: string;
	signup_date: Date;
	gender?: string;
	birth?: Date;
	country?: string;
}

const schema: Schema<UserProfile> = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
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
	},
	{ collection: "user_profiles" }
);

const userProfile = model<UserProfile>("UserProfile", schema);

export default userProfile;
