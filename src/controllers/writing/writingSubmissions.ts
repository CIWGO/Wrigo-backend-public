import { Request, Response } from "express";
import { getSubmittedWritingHistoryByMonth } from "./writingHistory";

const writingSubmissions = async (req: Request, res: Response) => {
	try {
		const { year, uid } = req.body;
		const data = {
			[`${year}-Jan`]: (await getSubmittedWritingHistoryByMonth(year, 1, uid)).length,
			[`${year}-Feb`]: (await getSubmittedWritingHistoryByMonth(year, 2, uid)).length,
			[`${year}-Mar`]: (await getSubmittedWritingHistoryByMonth(year, 3, uid)).length,
			[`${year}-Apr`]: (await getSubmittedWritingHistoryByMonth(year, 4, uid)).length,
			[`${year}-May`]: (await getSubmittedWritingHistoryByMonth(year, 5, uid)).length,
			[`${year}-Jun`]: (await getSubmittedWritingHistoryByMonth(year, 6, uid)).length,
			[`${year}-Jul`]: (await getSubmittedWritingHistoryByMonth(year, 7, uid)).length,
			[`${year}-Aug`]: (await getSubmittedWritingHistoryByMonth(year, 8, uid)).length,
			[`${year}-Sep`]: (await getSubmittedWritingHistoryByMonth(year, 9, uid)).length,
			[`${year}-Oct`]: (await getSubmittedWritingHistoryByMonth(year, 10, uid)).length,
			[`${year}-Nov`]: (await getSubmittedWritingHistoryByMonth(year, 11, uid)).length,
			[`${year}-Dec`]: (await getSubmittedWritingHistoryByMonth(year, 12, uid)).length
		};

		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || "Failed to gather data from the lineChart" });
	}
};

export { writingSubmissions };
