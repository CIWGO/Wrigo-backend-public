import axios from "axios";
import uuidv4 from "uuid";
import { Request, Response } from "express";
import config from "../../../config";
import { createOperationLog } from "../log/index";
import { generateSamplePrompt } from "./promptOperation";
import {
	topic as TopicModel,
	feedback as FeedbackModel,
	sampleWriting,
} from "../../models/index";

// OVERALL COMMENT
// Purpose of this component: to generate sample writing and its feedback with topic input

// Set up the OpenAI API client with your API key
const URL = config.OPENAI_APIURL;
const apiKey = config.OPENAI_APIKEY;

// Leave for frontend: Save draft or submit on frontend
// const saveOrSubmit = async (topic: string) => {
//   try {
//     const response = await axios.post("/api/create-sample-with-feedback", {
//       topic,
//     });
//     // handle success response
//     console.log(response.data);
//   } catch (error) {
//     // handle error response
//     console.error(error);
//   }
// };

// import from express
const sampleWritingFeedback = async (req: Request, res: Response) => {
	try {
		// generate sample writing based on given topic
		const prompt = generateSamplePrompt(req);
		// take out topic from req.body only
		const { topic } = req.body;
		// save topic to topicDoc
		const topicDoc = new TopicModel({
			topic_id: uuidv4(),
			topic_content: topic,
		});
		// save topic into the database
		await topicDoc.save();

		// send axios request to api
		// fetch no longer usable --> use axios
		axios({
			method: "POST",
			url: URL,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			data: {
				model: "gpt-3.5-turbo",
				messages: prompt,
				temperature: 1.5,
				max_tokens: 2000,
			},
		}).then(async (response) => {
			/* if response achieved
			parse json
			store it in DB
			then return it to user (postman)*/

			// create a new instance of SampleWritingModel
			const sampleWritingDoc = new sampleWriting({
				sample_writing_id: uuidv4(),
				sample_writing_content: sampleWriting,
			});
			const evaluateOutputFormat = new FeedbackModel({
				feedback_id: uuidv4(),
				writing_id: "<ID of the writing associated with this feedback>",
				created_time: new Date(),
				feedback_TR: "<Feedback on task response>",
				feedback_CC: "<Feedback on coherence and cohesion>",
				feedback_LR: "<Feedback on lexical resource>",
				feedback_GRA: "<Feedback on grammatical range and accuracy>",
				feedback_overall: "<Overall feedback>",
				score_TR: 8, // score for task response
				score_CC: 7, // score for coherence and cohesion
				score_LR: 6, // score for lexical resource
				score_GRA: 7, // score for grammatical range and accuracy
			});

			// save the new sample writing instance to the database
			await sampleWritingDoc.save();
			// save the new feedback instance to the database
			await evaluateOutputFormat.save();
		});
	} catch (error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"ApiCall",
			`User (uid: ${uid}) failed to get API response. ${
				error || "Failed to get response"
			}`,
			req.userIP,
			req.userDevice,
			uid
		);
		// if error detected, return the error
		return res
			.status(500)
			.json({ error: error.message || "Failed to get response" });
	}
};
// export module
export { sampleWritingFeedback };
