import { Request, Response } from "express";
import config from "../../../config";
import axios from "axios";
import { generatePrompt } from "./promptOperation";
import { createOperationLog } from "../log/index";
import { feedbackOperation } from "./feedbackOperation";
import { writingOperation } from "./writingOperation";


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
		const { uid } = req.body;
		const prompt = generatePrompt(req); // generate a prompt for evaluation

		// import writingOperation() to check if there is a new writingDoc
		const writingDoc = await writingOperation(req);

		// send axios request to api
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

			// find writingDoc and update the comment received from API
			feedbackOperation(response, writingDoc.writing_id);

			// create operation log and store it to DB
			createOperationLog(
				true,
				"ApiCall",
				`User (uid: ${uid}) writing evaluation service.`,
				req.userIP,
				req.userDevice,
				uid
			);

			return res.status(200).json(JSON.parse(response.data.choices[0].message.content));
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
		return res.status(500).json({ error: error.message || "Failed to get response" });
	}
};

export { evaluateWriting };
