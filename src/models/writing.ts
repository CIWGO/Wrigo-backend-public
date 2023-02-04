import { Schema, model, Types } from "mongoose";
export interface Writing {
  _id: Types.ObjectId;
  uid: string; //user id useful?
  isSubmitted: boolean;
  content: string;
  topic?: string;
  feedback?: string;
  mark?: number;
  date: Date;
}

const schema = new Schema<Writing>({
  uid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const article = model<Writing>("Article", schema);
export default article;
