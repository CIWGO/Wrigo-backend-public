// user JWT token data definition
import { Schema, model } from "mongoose";

export interface UserJWT {
	uid: string;
	JWT?: string;
}

const schema: Schema<UserJWT> = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		JWT: {
			type: String,
			required: true,
		},
	},
	{ collection: "user_JWTs" }
);

const userJWT = model<UserJWT>("UserJWT", schema);

export default userJWT;
