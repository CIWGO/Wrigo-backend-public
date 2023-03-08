// CIWGO generate writing sample with feedback definition
import { Schema, model } from "mongoose";

export interface SampleWriting {
	topic_id: string;
	sampleWriting_id: string;
	sampleWriting_content: string;
	sampleWriting_feedback: string;
}

const schema = new Schema<SampleWriting>(
	{
		topic_id: {
			type: String,
			required: true,
		},
		sampleWriting_id: {
			type: String,
			required: true,
			unique: true,
		},
		sampleWriting_content: {
			type: String,
		},
		sampleWriting_feedback: {
			type: String,
		},
	},
	{ collection: "sample_writing" }
);

const sampleWriting = model<SampleWriting>("SampleWriting", schema);

export default sampleWriting;
