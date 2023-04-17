import { Request, Response } from "express";
import { generatePrompt } from "./regularPrompt";
import { createOperationLog } from "../log/index";
import { feedbackOperation } from "./feedbackOperation";
import { writingOperation } from "./writingOperation";
import { openAIRequest } from "../../utils/openAIRequest";
import {
	generatePromptTR,
	generatePromptCC,
	generatePromptLR,
	generatePromptGRA
} from "./premiumPrompt";
import { premFeedbackOpe } from "./premFeedbackOpe";

/**
 * take topic and essay from user input and generate a prompt for evaluation
 * user res to send the scores and evaluation back to users
 * @param {Request} req request from users
 * @param {Response} res respond to users
 */
const evaluateWriting = async (req: Request, res: Response) => {
	try {
		const { uid, isSubscribed } = req.body;

		// import writingOperation() to check if there is a new writingDoc
		const writingDoc = await writingOperation(req);

		if (isSubscribed === false) {
			const prompt = generatePrompt(req); // generate a prompt for evaluation
			const response = await openAIRequest(prompt, false);

			if (response instanceof Error) {
				throw new Error("Cannot get response");
			} else {
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

				return res.status(200).json({ isSubscribed, response });
			}
		} else if (isSubscribed === true) {
			// generate a prompt for evaluation in each criteria
			const promptTR = generatePromptTR(req);
			const promptCC = generatePromptCC(req);
			const promptLR = generatePromptLR(req);
			const promptGRA = generatePromptGRA(req);

			const responseTR = await openAIRequest(promptTR, true);
			const responseCC = await openAIRequest(promptCC, true);
			const responseLR = await openAIRequest(promptLR, true);
			const responseGRA = await openAIRequest(promptGRA, true);

			if (
				responseTR instanceof Error
				|| responseCC instanceof Error
				|| responseLR instanceof Error
				|| responseGRA instanceof Error
			) {
				throw new Error("Cannot get response");
			} else {
				// extract score and comment from response
				const regexTR = /\d+\.\d+/;
				const regexCC = /\d+\.\d+/;
				const regexLR = /\d+\.\d+/;
				const regexGRA = /\d+\.\d+/;
				
				try {

					const extractedScoreTR = await responseTR.match(regexTR)[0];
					const extractedScoreCC = responseCC.match(regexCC)[0];
					const extractedScoreLR = responseLR.match(regexLR)[0];
					const extractedScoreGRA = responseGRA.match(regexGRA)[0];

					const extractedTextTR = await responseTR.replace(regexTR, "");
					const extractedTextCC = responseCC.replace(regexCC, "");
					const extractedTextLR = responseLR.replace(regexLR, "");
					const extractedTextGRA = responseGRA.replace(regexGRA, "");

					const premiumFeedback = {
						"commentTR": extractedTextTR,
						"commentCC": extractedTextCC,
						"commentLR": extractedTextLR,
						"commentGRA": extractedTextGRA,
						"TR": extractedScoreTR,
						"CC": extractedScoreCC,
						"LR": extractedScoreLR,
						"GRA": extractedScoreGRA,
					};
					premFeedbackOpe(premiumFeedback, writingDoc.writing_id);

					// create operation log and store it to DB
					createOperationLog(
						true,
						"ApiCall",
						`User (uid: ${uid}) writing evaluation service.`,
						req.userIP,
						req.userDevice,
						uid
					);

					return res.status(200).json({ isSubscribed, premiumFeedback });

				} catch (error) {
					throw new Error("Cannot get response");
				}
			}
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
		return res.status(500).json({ error: error.message || "Failed to get response" });
	}
};

export { evaluateWriting };
