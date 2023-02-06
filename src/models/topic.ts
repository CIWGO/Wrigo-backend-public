import { Schema, model, Types } from "mongoose";

export interface Topic {
    topic_id: Types.ObjectId;
    topic_content: string;
    topic_category: string;
    topic_difficulty: string;
}

const schema = new Schema<Topic>({
    topic_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    topic_content: {
        type: String,
        required: true,
    },
    topic_category: {
        type: String,  
        required: true,
    },
    topic_difficulty: {
        type:String, 
        required: true,
    },
});
  
  const topic = model<Topic>("Topic", schema);
  export default topic;
  