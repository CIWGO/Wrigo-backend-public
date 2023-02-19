// user login history data definition
import { Schema, model } from "mongoose";

export interface UserLoginHistory {
	login_history_id: string;
	uid: string;
	login_time: Date;
	login_IP: string;
	login_device?: string;
}

const schema: Schema<UserLoginHistory> = new Schema({
	login_history_id: {
		type: String,
		required: true,
		unique: true,
	},
	uid: {
		type: String,
		required: true,
	},
	login_time: {
		type: Date,
		required: true,
	},
	login_IP: {
		type: String,
		required: true,
	},
	login_device: {
		type: String,
	},
});

const userLoginHistory = model<UserLoginHistory>("UserLoginHistory", schema);

export default userLoginHistory;
