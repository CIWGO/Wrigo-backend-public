// user writing feedback data definition
import { Schema, model } from "mongoose";

export interface Feedback {
	feedback_id: string;
	writing_id: string;
	created_time: Date;
	feedback_TR: string;
	feedback_CC: string;
	feedback_LR: string;
	feedback_GRA: string;
	feedback_overall: string;
	score_TR: number;
	score_CC: number;
	score_LR: number;
	score_GRA: number;
}

const schema = new Schema<Feedback>(
	{
		feedback_id: {
			type: String,
			required: true,
			unique: true,
		},
		writing_id: {
			type: String,
			required: true,
		},
		created_time: {
			type: Date,
			required: true,
		},
		feedback_TR: {
			type: String,
			required: true,
		},
		feedback_CC: {
			type: String,
			required: true,
		},
		feedback_LR: {
			type: String,
			required: true,
		},
		feedback_GRA: {
			type: String,
			required: true,
		},
		feedback_overall: {
			type: String,
		},
		score_TR: {
			type: Number,
			required: true,
		},
		score_CC: {
			type: Number,
			required: true,
		},
		score_LR: {
			type: Number,
			required: true,
		},
		score_GRA: {
			type: Number,
			required: true,
		},
	},
	{ collection: "writing_feedbacks" }
);

const feedback = model<Feedback>("Feedback", schema);

export default feedback;
