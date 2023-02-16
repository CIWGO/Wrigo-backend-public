import { Schema, model, Types } from "mongoose";

export interface Feedback extends Document {
  _id: Types.ObjectId;
  created_time: Date;
  feedback: {
    TR: [string];
    CC: [string];
    LR: [string];
    GRA: [string];
    Overall: [string];
  };
  score: {
    TR: number;
    CC: number;
    LR: number;
    GRA: number;
  };
}

const schema = new Schema<Feedback>({
  created_time: {
    type: Date,
    required: true,
  },
  feedback: {
    TR: {
      type: [String],
      required: true,
    },
    CC: {
      type: [String],
      required: true,
    },
    LR: {
      type: [String],
      required: true,
    },
    GRA: {
      type: [String],
      required: true,
    },
  },
  score: {
    TR: {
      type: Number,
      required: true,
    },
    CC: {
      type: Number,
      required: true,
    },
    LR: {
      type: Number,
      required: true,
    },
    GRA: {
      type: Number,
      required: true,
    },
    Overall: {
      type: Number,
      required: true,
    },
  },
});

const Feedback = model<Feedback>("Feedback", schema);
export default Feedback;
