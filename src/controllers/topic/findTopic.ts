import { sampleWriting as SampleWritingModel, topic as TopicModel } from "../../models/index";
import { Response, Request } from "express";

/**
 * Get all topics for the frontend functions. Making request to /findTopic will get response
 * with a findTopic json document.
 * @param {Request} req The HTTP request object containing type:
 * ("allTopics", "allSamplesWithFeedbacks", "oneTopic").
 * @param {Response} res The HTTP response object used to send a response to the frontend with a
 * required document in json.
 * @return {Promise<void>} A promise that resolves when the topic(s) is fetched successfully from db, 
 * or rejects with an error if the type is not correct.
 * @source url
 */

const findTopic = async (req:Request, res:Response) => {
	const {type} = req.body;
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
		} else if (type === "oneTopic") {
			const { topic_id } = req.body;
			const singleTopic = await TopicModel.findOne({ topic_id }).exec();
			const oneSampleWithFeedback = await SampleWritingModel.findOne({ topic_id }).exec();
			return res.status(200).json({ singleTopic, oneSampleWithFeedback });
		} else if (type === "getPopularTopics") {
			const popularTopics = await TopicModel.find({}).sort({ popularity: -1 }).limit(4);
			return res.status(200).json({ popularTopics});
		}
		else {
			return res.status(404).json({error: "Input type not supported"});
		}
	} catch (error) {
		return res.status(500).json({error: error.message ||"Fail to response"});
	}
};

export {findTopic};