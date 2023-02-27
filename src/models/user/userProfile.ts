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
	study_field?: string;
}

const schema: Schema<UserProfile> = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			reqired: false,
			unique:true,
		},
		avatar: {
			type: String,
		},
		signup_date: {
			type: Date,
			required: false,
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
		}
	},
	{ collection: "user_profiles" }
);

const userProfile = model<UserProfile>("UserProfile", schema);

export default userProfile;
