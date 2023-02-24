import { writing, feedback, operationLog} from "../../models/index";
import { Response, Request } from "express";

const feedbackHistory = async (writing_id) => {
	const feedbacks = await feedback.find({writing_id}).exec();
	return feedbacks;
};

const writingHistory = async (from, to) => {
	const results = [];
	const writingHistory = await writing.find({submit_time:{$gte:from, $lte:to}});
	if (writingHistory.length !== 0){
		writingHistory.forEach(element => {
			results.push(element);
			results.push(feedbackHistory(element.writing_id));
		});
	}
	return results;
};

const logHistory = async (from, to, uid) => {
	const logs = await operationLog.find({uid,log_time:{$gte:from, $lte:to}});
	return logs;
};

const viewHistory = async (req:Request, res:Response) => {
	const {type} = req.body;
	try {
		if (type === "feedback") {
			const {writing_id} = req.body;
			const feedback = feedbackHistory(writing_id);
			return res.status(200).json(feedback);
		} else if (type === "writingHistory"){
			const {from, to} = req.body;
			const writings = writingHistory(from, to);
			return res.status(200).json(writings);
		} else if(type === "logHistory") {
			const {from, to, uid} = req.body;
			const logs = logHistory(from, to, uid);
			return res.status(200).json(logs);
		} else {
			return res.status(404).json({error: "Input type not supported"});
		}   
	} catch (error) {
		return res.status(500).json({error: error.message ||"Fail to response"});
	}
};

export {viewHistory};
