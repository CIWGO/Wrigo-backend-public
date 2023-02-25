// parse response from API
import { v4 as uuidv4 } from "uuid";
import { feedback as FeedbackModel } from "../../models";
/**
 * create a function to operate the response from OpenAI API.
 * picked the data from response and created an feedback as feedback model.
 * then save the feedback to DataBase.
 * @param {any} response the response data from API.
 * @param {string} writing_id the id of writingDoc.
 */

const feedbackOperation = (response:any, writing_id: string) => {
	const evaluateOutput = JSON.parse(response.data.choices[0].text);
	const feedbackDoc = new FeedbackModel({
		feedback_id: uuidv4(),
		writing_id: writing_id,
		created_time: new Date(Date.now()),
		feedback_TR: evaluateOutput.feedback.TR,
		feedback_CC: evaluateOutput.feedback.CC,
		feedback_LR: evaluateOutput.feedback.LR,
		feedback_GRA: evaluateOutput.feedback.GRA,
		feedback_overall: evaluateOutput.feedback.Overall,
		score_TR: evaluateOutput.scores.TR,
		score_CC: evaluateOutput.scores.CC,
		score_LR: evaluateOutput.scores.LR,
		score_GRA: evaluateOutput.scores.GRA,
	});

	feedbackDoc.save();
};

export { feedbackOperation };
