import { Request, Response } from "express";
import { writing as Writing, feedback as Feedback } from "../../models/index";

/**
 * take uid return the writings & feedback data needed for data visualization
 * @param {Request} req uid
 * @param {Response} res 7 arrays will be returned:
 * res[0-4]: arrays for the line chart, the return order is tr,cc,lr,gra,mean
 * res[5]: array for the radar chart: element order in the array is tr,cc,lr,gra
 * res[6]: array for the display number Chart, element order in the array is hight, median, improved, submission times
 */

const WritingStatistics = async (req: Request, res: Response) => {
	const { uid } = req.body;

	try {
		// Find all writings with the target uid
		const writings = await Writing.find({ uid: uid }).select("_id");
		const writingIds = writings.map(writing => writing._id);

		// Find all feedbacks based on the writing ids
		// sort it from old to new
		const feedbacks = await Feedback.find({ writingId: { $in: writingIds } }).sort({ createdAt: 1 });
		const len = feedbacks.length;

		const recentFeedbackObj = feedbacks[len-1];

		const trArray = feedbacks.map((feedback) => feedback.score_TR);
		const ccArray = feedbacks.map((feedback) => feedback.score_CC);
		const lrArray = feedbacks.map((feedback) => feedback.score_LR);
		const grdArray = feedbacks.map((feedback) => feedback.score_GRA);
		const meanArray = trArray.map((tr, i) => (tr + ccArray[i] + lrArray[i] + grdArray[i]) / 4);

		const radarArr = [recentFeedbackObj.score_TR, recentFeedbackObj.score_CC, recentFeedbackObj.score_LR, recentFeedbackObj.score_GRA];

		const meanHighArr = meanArray.sort(function(a, b) {
			return b - a;
		});
		const meanHigh = meanHighArr[0];
		const median = meanHighArr[Math.round(len / 2-1) ];
		const improved = meanHigh - median;
		const numberChart = [meanHigh, median, improved, len];

		res.json({ trArray, ccArray, lrArray, grdArray, meanArray,radarArr,numberChart });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || "Failed to gather data from the lineChart" });
	}

};

export default WritingStatistics;