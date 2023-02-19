// app operation log data definition
import { Schema, model } from "mongoose";

export interface OperationLog {
	log_id: string;
	uid?: string;
	login_status: boolean;
	log_time: Date;
	log_type?: string; // userCreation, authentication, userAction, payment, ApiCall
	log_content: string;
}

const schema: Schema<OperationLog> = new Schema({
	log_id: {
		type: String,
		required: true,
		unique: true,
	},
	uid: {
		type: String,
	},
	login_status: {
		type: Boolean,
	},
	log_time: {
		type: Date,
		required: true,
	},
	log_type: {
		type: String,
	},
	log_content: {
		type: String,
		required: true,
	},
});

const operationLog = model<OperationLog>("OperationLog", schema);

export default operationLog;
