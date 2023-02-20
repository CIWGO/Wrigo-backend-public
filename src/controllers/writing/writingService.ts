import { topic as TopicModel, writing as WritingModel } from "../../models";
import { Request, Response } from "express";
import config from "../../../config";
import axios from "axios";
import { generatePromptForEvaluation } from "./promptOperation";
// change name from generatePromptForEvaluation to generatePrompt
import { v4 as uuidv4 } from "uuid";

// Revise import path accordingly if necessary
// Change the file name to writingEvaluation

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const URL = config.OPENAI_APIURL;
const apiKey = config.OPENAI_APIKEY;

// take topic and essay from user input and generate a prompt for evaluation
const evaluateWriting = async (req: Request, res: Response) => {
	try {
		const { topic, content } = req.body;
		const prompt = generatePromptForEvaluation(req); // generate a prompt for evaluation

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
		// if error detected, return the error
		res.send(error || "Failed to get response");
	}
};

export { evaluateWriting };
