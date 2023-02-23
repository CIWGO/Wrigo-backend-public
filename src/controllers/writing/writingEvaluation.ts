import { topic as TopicModel, writing as WritingModel } from "../../models";
import { Request, Response } from "express";
import config from "../../../config";
import axios from "axios";
import { generatePrompt } from "./promptOperation";
import { v4 as uuidv4 } from "uuid";
import { createOperationLog } from "../log/index";

const URL = config.OPENAI_APIURL;
const apiKey = config.OPENAI_APIKEY;

/**
 * take topic and essay from user input and generate a prompt for evaluation
 * user res to send the scores and evaluation back to users
 * @param {Request} req request from users
 * @param {Response} res respond to users
 */
const evaluateWriting = async (req: Request, res: Response) => {
	try {
		const { uid, topic, content } = req.body;
		const prompt = generatePrompt(req); // generate a prompt for evaluation

		const topicDoc = new TopicModel({
			topic_id: uuidv4(),
			topic_content: topic,
		});

		const writingDoc = new WritingModel({
			uid: uuidv4(),
			create_time: "1970-01-01", // this date will be changed later with other tickets
			isSubmitted: true,
			submit_time: new Date(Date.now()),
			task_topic: topic,
			writing_content: content,
		});

		await topicDoc.save();
		await writingDoc.save();
		// create operation log and store it to DB
		createOperationLog(
			true,
			"ApiCall",
			`User (uid: ${uid}) writing evaluation service.`,
			req.userIP,
			req.userDevice,
			uid
		);

		// send axios request to api
		axios({
			method: "POST",
			url: URL,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			data: {
				model: "text-davinci-003",
				prompt: prompt,
				temperature: 0.2,
				max_tokens: 1000,
			},
		}).then((response) => {
			/* if response achieved
					parse json
					store it in DB
					then return it to user (postman)*/
			const comment = JSON.parse(response.data.choices[0].text);

			// find writingDoc and update the comment received from API
			WritingModel.findOneAndUpdate(
				{ uid: writingDoc.uid },
				{
					feedback_id: uuidv4(),
					feedback: comment.feedback,
					score: comment.Scores,
				}
			);

			res.status(200).json(comment);
		});
	} catch (error) {
		const uid = req.body.uid;
		// create operation log and store it to DB
		createOperationLog(
			true,
			"ApiCall",
			`User (uid: ${uid}) failed to get API response. ${error || "Failed to get response"}`,
			req.userIP,
			req.userDevice,
			uid
		);
		// if error detected, return the error
		res.send(error || "Failed to get response");
	}
};

export { evaluateWriting };