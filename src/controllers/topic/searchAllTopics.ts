import { topic as TopicModel } from "../../models/index";
import { Response, Request } from "express";
/**
 * Get all topics for the frontend search functions. Making request to /searchAllTopics will get response
 * with a searchAllTopics json document.
 * @param {Request} req The HTTP request object containing type:
 * ("input").
 * @param {Response} res The HTTP response object used to send a response to the frontend with a
 * required document in json.
 * @return {Promise<void>} A promise that resolves when the topic(s) is fetched successfully from db, 
 * or rejects with an error if the type is not correct.
 * @source url
 */
const searchAllTopics = async (req:Request, res:Response) => {
	const {input} = req.body;
	try {
		const regex = new RegExp(input,"i");
		const result = await TopicModel.find( { topic_content: { $regex: regex } } ).exec();
		return res.status(200).json(result);

	} catch (error) {
		return res.status(500).json({error: error.message ||"Fail to response"});
	}
};

export {searchAllTopics};