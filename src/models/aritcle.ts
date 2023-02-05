import { Schema, model, Types } from "mongoose";
export interface Article {
  _id: Types.ObjectId;
  uid: string; //user id useful?
  isSubmitted: boolean;
  content: string;
  topic?: string;
  feedback?: string;
  mark?: number;
  date: Date;
}

const schema = new Schema<Article>({
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
  topic: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  mark: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const article = model<Article>("Article", schema);
export default article;
