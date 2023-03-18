import { Request, Response } from "express";
import { generatePrompt } from "./promptOperation";
import { createOperationLog } from "../log/index";
import { feedbackOperation } from "./feedbackOperation";
import { writingOperation } from "./writingOperation";
import { openAIRequest } from "../../utils/openAIRequest";

// import config from "../../../config";

// const URL = config.OPENAI_APIURL;
// const apiKey = config.OPENAI_APIKEY;

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

		const response = await openAIRequest(prompt, 3);
		if (response instanceof Error) {
			throw new Error("Cannot get response");
		} else {
			feedbackOperation(response, writingDoc.writing_id);

			createOperationLog(
				true,
				"ApiCall",
				`User (uid: ${uid}) writing evaluation service.`,
				req.userIP,
				req.userDevice,
				uid
			);

			return res.status(200).json(JSON.parse(response.data.choices[0].message.content));
		}
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
		return res.status(500).json({error: error.message || "Failed to get response"});
	}
};

export { evaluateWriting };
