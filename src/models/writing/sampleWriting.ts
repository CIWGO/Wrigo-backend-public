// CIWGO generate writing sample with feedback definition
import { Schema, model } from "mongoose";

export interface SampleWriting {
	topic_id: string;
	sampleWriting_id: string;
	sampleWriting_content: string;
	sampleFeedback_TR: string;
	sampleFeedback_CC: string;
	sampleFeedback_LR: string;
	sampleFeedback_GRA: string;
	sampleScore_TR: number;
	sampleScore_CC: number;
	sampleScore_LR: number;
	sampleScore_GRA: number;
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
			required: true
		},
		sampleFeedback_TR: {
			type: String,
			// required: true
		},
		sampleFeedback_CC: {
			type: String,
			// required: true
		},
		sampleFeedback_LR: {
			type: String,
			// required: true
		},
		sampleFeedback_GRA: {
			type: String,
			// required: true
		},
		sampleScore_TR: {
			type: Number,
			// required: true
		},
		sampleScore_CC: {
			type: Number,
			// required: true
		},
		sampleScore_LR: {
			type: Number,
			// required: true
		},
		sampleScore_GRA: {
			type: Number,
			// required: true
		},
	},
	{ collection: "sample_writing" }
);

const sampleWriting = model<SampleWriting>("SampleWriting", schema);

export default sampleWriting;
