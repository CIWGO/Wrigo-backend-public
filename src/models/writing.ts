import { Schema, model, Types } from "mongoose";
export interface Writing {
  _id: Types.ObjectId;
  uid: string;
  create_time: Date;
  isSubmitted: boolean;
  submit_time: Date;
  task_topic: string;
  writing_content: string;
  feedback: [string,string]; //feedback: [feedback_id, feedback]
  score: [number];
  total_score: number;
}

const schema = new Schema<Writing>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  submit_time: {
    type: Date,
    required: true,
  },
  task_topic: {
    type: String,
    required: false,
  },
  writing_content: {
    type: String,
    required: true,
  },
  feedback: {
    type: [String, String],
    required: false,
  },
  score: {
    type: [Number],
    required: false,
  },
  total_score: {
    type: Number,
    required: false,
  }
});

const writing = model<Writing>("Writing", schema);
export default writing;
