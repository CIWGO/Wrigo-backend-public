import TopicModel from "../../models/topic";
import WritingModel from "../../models/writing";
import { Request, Response } from "express";
import config from "../../config";
import axios from "axios";
import { generatePromptForEvaluation } from "./promptOperation";
import { v4 as uuidv4 } from "uuid";

const URL = "https://api.openai.com/v1/completions";
const apiKey = config.OPENAI_APIKEY;

// take topic and essay from user input and generate a prompt for evaluation
const evaluateWriting = async (req: Request, res: Response) => {
	const { topic, content } = req.body;
	const prompt = generatePromptForEvaluation(req); // generate a prompt for evaluation

	const topicDoc = new TopicModel({
		topic_id: uuidv4(),
		topic_content: topic
	});

	const writingDoc = new WritingModel({
		uid: uuidv4(),
		create_time: "1970-01-01", // this date will be changed later with other tickets
		isSubmitted: true,
		submit_time: new Date(Date.now()),
		task_topic: topic,
		writing_content: content
	});

	topicDoc.save();
	writingDoc.save();

	// send axios request to api
	axios(
		{
			method: "POST",
			url: URL,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			data: {
				model: "text-davinci-003",
				prompt: prompt,
				temperature: 0.2,
				max_tokens: 1000,
			},
		}
	).then((response) => {
		/* if response achieved
         parse json
         store it in DB
         then return it to user (postman)*/
		res.status(200).json(JSON.parse(response.data.choices[0].text));
	}).catch((error) => {
		// if error detected, return the error
		res.send(error || "Failed to get response");
	});
};

export { evaluateWriting };