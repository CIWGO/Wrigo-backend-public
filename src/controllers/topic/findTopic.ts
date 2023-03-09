import { sampleWriting as SampleWritingModel, topic as TopicModel } from "../../models/index";
import { Response, Request } from "express";



const findTopic = async (req:Request, res:Response) => {
	const {type,uid} = req.body;
	try {
		//get all topics
		if (type === "allTopics") {
			const allTopics = await TopicModel.find({}).exec();
			return res.status(200).json(allTopics);
			//get all sample writings with feedbacks
		} else if (type === "allSamplesWithFeedbacks") {
			const allSamplesWithFeedbacks = await SampleWritingModel.find({}).exec();
			return res.status(200).json(allSamplesWithFeedbacks);
			//get the topic by topic_id
		} else if (type === "findOne") {
			const { topic_id } = req.body;
			const singleTopic = await TopicModel.findOne({ topic_id }).exec();
			const oneSampleWithFeedback = await SampleWritingModel.findOne({ topic_id }).exec();
			return res.status(200).json({ singleTopic, oneSampleWithFeedback });
		} else {
			return res.status(404).json({error: "Input type not supported"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message ||"Fail to response"});
	}
};

export {findTopic};