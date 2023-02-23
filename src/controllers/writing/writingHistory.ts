import { writing, feedback, operationLog} from "../../models/index";
import { Response, Request } from "express";

const feedbackHistory = async (writing_id) => {
    const feedbacks = await feedback.find({writing_id}).exec();
    return feedbacks
}

const writingHistory = async (from, to) => {
    const results = []
    const writingHistory = await writing.find({submit_time:{$gte:from, $lte:to}})
    if (writingHistory.length !== 0){
        writingHistory.forEach(element => {
            results.push(element)
            results.push(feedbackHistory(element.writing_id))
        });
    }
    return results
}

const logHistory = async (from, to, uid) => {
    const logs = await operationLog.find({uid,log_time:{$gte:from, $lte:to}})
    return logs
}

const viewHistory = async (req:Request, res:Response) => {
    const {type} = req.body
    if (type === "feedback") {
        const {writing_id} = req.body
        res.status(200).json(feedbackHistory(writing_id));
    } else if (type === "writingHistory"){
        const {from, to} = req.body
        res.status(200).json(writingHistory(from, to));
    } else if(type === "logHistory") {
        const {from, to, uid} = req.body
        res.status(200).json(logHistory(from, to, uid));
    } else {
        res.status(404).json("Input type not supported")
    }
}

export {viewHistory};
