// CIWGO generate writing sample with feedback definition
import { Schema, model } from "mongoose";

export interface SampleWriting {
	topic_id: string;
	writing_id: string;
	feedback_id: string;
}

const schema = new Schema<SampleWriting>(
	{
		topic_id: {
			type: String,
			required: true,
			unique: true,
		},
		writing_id: {
			type: String,
			required: true,
			unique: true,
		},
		feedback_id: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ collection: "sample_writing" }
);

const sampleWriting = model<SampleWriting>("SampleWriting", schema);

export default sampleWriting;
