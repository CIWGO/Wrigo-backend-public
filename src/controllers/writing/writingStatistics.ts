import { Request, Response } from "express";
import { writing as Writing, feedback as Feedback } from "../../models/index";

const WritingStatistics = async (req: Request, res: Response) => {
	const { uid } = req.body;

	try {
		// Find all writings with the target uid
		const writings = await Writing.find({ uid: uid }).select("_id");
		const writingIds = writings.map(writing => writing._id);

		// Find all feedbacks based on the writing ids
		const feedbacks = await Feedback.find({ writingId: { $in: writingIds } });

		const trArray = feedbacks.map((feedback) => feedback.score_TR);
		const ccArray = feedbacks.map((feedback) => feedback.score_CC);
		const lrArray = feedbacks.map((feedback) => feedback.score_LR);
		const grdArray = feedbacks.map((feedback) => feedback.score_GRA);
		const meanArray = trArray.map((tr, i) => (tr + ccArray[i] + lrArray[i] + grdArray[i]) / 4);

		res.json({ trArray, ccArray, lrArray, grdArray, meanArray });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || "Failed to gather data from the lineChart" });
	}

};

export { WritingStatistics };