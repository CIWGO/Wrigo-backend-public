import { Schema, model, Types } from "mongoose";

export interface Topic extends Document {
  _id: Types.ObjectId;
  topic_content: string;
  topic_category?: string;
  topic_difficulty?: string;
}

const schema = new Schema<Topic>({
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
});

const topic = model<Topic>("Topic", schema);
export default topic;
