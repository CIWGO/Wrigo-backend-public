import { writing } from "../../models/index";
import { Request, Response } from "express";
import { feedbackHistory } from "./writingHistory";


const getFeedbacks = async (req: Request, res: Response) => {
	try {
		const { uid } = req.body;
		const feedback = await writing.find({ uid: uid, isSubmitted: true })
			.sort({ submit_time: -1 })
			.limit(7)
			.select({ writing_id: 1, _id: 0 });
		const feedbackIds = feedback.map(f => f.writing_id);
		const feedbackResults = await Promise.all(feedbackIds.map(id => feedbackHistory(id)));
		const nonEmptyFeedbackResults = feedbackResults.filter(result => result.length > 0);
		res.status(200).json(nonEmptyFeedbackResults);

	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

export  {getFeedbacks};