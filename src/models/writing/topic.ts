// user writing task topic definition
import { Schema, model } from "mongoose";

export interface Topic {
	topic_id: string;
	topic_content: string;
	topic_category?: string;
	topic_difficulty?: string;
}

const schema = new Schema<Topic>(
	{
		topic_id: {
			type: String,
			required: true,
			unique: true,
		},
		topic_content: {
			type: String,
			required: true,
		},
		topic_category: {
			type: String,
		},
		topic_difficulty: {
			type: String,
		},
	},
	{ collection: "writing_topics" }
);

const topic = model<Topic>("Topic", schema);

export default topic;
