// user writing data definition
import { Schema, model } from "mongoose";

export interface Writing {
	writing_id: string;
	uid: string;
	create_time: Date;
	submit_time?: Date;
	isSubmitted: boolean;
	task_topic: string;
	writing_content: string;
}

const schema = new Schema<Writing>(
	{
		writing_id: {
			type: String,
			required: true,
			unique: true,
		},
		uid: {
			type: String,
			required: true,
		},
		create_time: {
			type: Date,
			required: true,
		},
		submit_time: {
			type: Date,
		},
		isSubmitted: {
			type: Boolean,
			required: true,
		},
		task_topic: {
			type: String,
			required: true,
		},
		writing_content: {
			type: String,
			required: true,
		},
	},
	{ collection: "writings" }
);

const writing = model<Writing>("Writing", schema);

export default writing;
