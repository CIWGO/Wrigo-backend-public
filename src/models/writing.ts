import { Schema, model, Types } from "mongoose";

export interface Writing extends Document {
  _id: Types.ObjectId;
  uid: string;
  create_time: Date;
  isSubmitted: boolean;
  submit_time?: Date;
  task_topic?: string;
  writing_content: string;
  feedbackID?: [string]; // refers to id in feedback model
  //feedback_id: string;
  //feedback?: []; //feedback: [feedback_id, feedback]
  //score?: []; // Data type stored in this array: number
  //total_score?: number;
}

const schema = new Schema<Writing>({
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
  },
  task_topic: {
    type: String,
  },
  writing_content: {
    type: String,
    required: true,
  },
  feedbackID: {
    type: [],
  },
});

const writing = model<Writing>("Writing", schema);
export default writing;
