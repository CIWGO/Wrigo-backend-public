// CIWGO topics writing with feedback definition
import { Schema, model } from "mongoose";

export interface GenerateWriting {
	topic_id: string;
	topic_content: string;
	topic_category?: string;
	topic_difficulty?: string;
}

const schema = new Schema<GenerateWriting>(
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
	{ collection: "generate_writings" }
);

const generateWriting = model<GenerateWriting>("GenerateWriting", schema);

export default generateWriting;
