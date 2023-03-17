import { Request, Response } from "express";
import { getSubmittedWritingHistoryByPeriod } from "./writingHistory";

const writingSubmissions = async (req: Request, res: Response) => {
	const { uid } = req.body;
	const currentDate = new Date();
	const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 3));

	try {
		const writingHistory = await getSubmittedWritingHistoryByPeriod(threeMonthsAgo, currentDate, uid);

		console.log(writingHistory);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || "Failed to get submission data" });
	}

};

export default writingSubmissions;