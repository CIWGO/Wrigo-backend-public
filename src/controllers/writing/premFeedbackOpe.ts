import { v4 as uuidv4 } from "uuid";
import { feedback as FeedbackModel } from "../../models";

const premFeedbackOpe = async (premiumFeedback: any, writing_id: string) => {
    try {

        const premFeedbackDoc = new FeedbackModel({
            feedback_id: uuidv4(),
            writing_id: writing_id,
            created_time: new Date(Date.now()),
            feedback_TR: premiumFeedback.commentTR,
            feedback_CC: premiumFeedback.commentCC,
            feedback_LR: premiumFeedback.commentLR,
            feedback_GRA: premiumFeedback.commentGRA,
            score_TR: premiumFeedback.TR,
            score_CC: premiumFeedback.CC,
            score_LR: premiumFeedback.LR,
            score_GRA: premiumFeedback.GRA,
        });
        premFeedbackDoc.save();
        return;
    } catch (error) {
        return Error("Cannot get feedback, please try again");
    }
};

export { premFeedbackOpe };