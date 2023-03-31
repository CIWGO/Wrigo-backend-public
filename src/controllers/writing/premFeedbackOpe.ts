import { v4 as uuidv4 } from "uuid";
import { feedback as FeedbackModel } from "../../models";

const premFeedbackOpe = async (response: any, writing_id: string) => {
   try{
       const comment = response;
       const premFeedbackDoc = new FeedbackModel({
           feedback_id: uuidv4(),
           writing_id: writing_id,
           created_time: new Date(Date.now()),
           feedback_TR: comment.commentTR,
           feedback_CC: comment.commentCC,
           feedback_LR: comment.commentLR,
           feedback_GRA: comment.commentGRA,
           score_TR: comment.TR,
           score_CC: comment.CC,
           score_LR: comment.LR,
           score_GRA: comment.GRA,
        });
        premFeedbackDoc.save();
        return;
    }catch (error) {
		return Error("Cannot get feedback, please try again");
	}
};

export { premFeedbackOpe };