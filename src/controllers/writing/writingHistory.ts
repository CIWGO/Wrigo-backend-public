import { writing as WritingModel, feedback as FeedbackModel, operationLog as LogModel } from "../../models/index";
import { Response, Request } from "express";
import { createOperationLog } from "../log/index";

/*
Get different types of history: types containing: feedback, writingHistory,	logHistory, writingDoc 
sorted by timestamp, from recent to oldest
*/
//get single writing by writing_id, 
const getWritingDoc = async (writing_id) => {
	try {
		const writingDoc = await WritingModel.findOne({ writing_id }).exec();
		if (!writingDoc) {
			throw new Error("Writing not found");
		}
		return writingDoc;
	} catch (error) {
		console.error("Error fetching writing:", error);
		throw error;
	}
};
//Given writing_id will get all its feedbacks, sorted by timestamp
const feedbackHistory = async (writing_id) => {
	const feedback = await FeedbackModel.find({ writing_id }).sort({ created_time: -1 }).exec();
	return feedback;
};

//Given time period, will get all writing but not containing any feedback
const writingHistory = async (from, to, uid) => {
	const writingHistory = await WritingModel.find({ uid, submit_time: { $gte: from, $lte: to } }).sort({ submit_time: -1 }).exec();
	return writingHistory;
};

//Given time year and month, will get all submitted writing but not containing any feedback
const getSubmittedWritingHistoryByMonth = async (year, month, uid) => {
	const targetDate = new Date(year, month - 1, 1); // Month parameter is 0-indexed, so we subtract 1
	const nextMonth = new Date(year, month, 1); // This will give the first day of the next month

	try {
		const submissions = await WritingModel.find({
			uid,
			submit_time: {
				$gte: targetDate,
				$lt: nextMonth,
			},
			isSubmitted: true,
		});
		return submissions;
	} catch (error) {
		console.error("Error fetching submissions:", error);
	}
};

// Given time period, will get all log history
const logHistory = async (from, to, uid) => {
	const logs = await LogModel.find({ uid, log_time: { $gte: from, $lte: to } });
	return logs;
};


/* feedback req: type == "feedback", writing_id
   writingHistory: type == "writingHistory", from: date, to: date, uid: string
   logHistory: type == "logHistory", from: date, to: date, uid: string
*/

const viewHistory = async (req: Request, res: Response) => {
	const { type, uid } = req.body;
	try {
		if (type === "feedback") {
			const { writing_id } = req.body;
			const feedback = await feedbackHistory(writing_id);
			createOperationLog(
				true,
				"getFeedback",
				`Get feedback of writing (writing_id: ${writing_id}, uid: ${uid}) successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json(feedback);
		} else if (type === "writingHistory") {
			const { from, to, uid } = req.body;
			const writings = await writingHistory(from, to, uid);
			createOperationLog(
				true,
				"getFeedback",
				`Get all writing from user uid: ${uid}) successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json(writings);
		} else if (type === "logHistory") {
			const { from, to, uid } = req.body;
			const logs = await logHistory(from, to, uid);
			createOperationLog(
				true,
				"getFeedback",
				`Get history of log operation uid: ${uid} successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json(logs);
		}else if (type === "writingDoc") {
			const { writing_id } = req.body;
			const writingDoc = await getWritingDoc(writing_id);
			createOperationLog(
				true,
				"getWritingDoc",
				`Get writing document (writing_id: ${writing_id}, uid: ${uid}) successfully.`,
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(200).json(writingDoc);
		} else {
			createOperationLog(
				false,
				"getHistory",
				"Get history failed. Input type not supported",
				req.userIP,
				req.userDevice,
				uid
			);
			return res.status(404).json({ error: "Input type not supported" });
		}
	} catch (error) {
		createOperationLog(
			false,
			"getHistory",
			`Get history failed. ${error.message}`,
			req.userIP,
			req.userDevice,
			uid
		);
		return res.status(500).json({ error: error.message || "Fail to response" });
	}
};

export { viewHistory, getSubmittedWritingHistoryByMonth };
