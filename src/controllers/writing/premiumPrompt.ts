import { Request } from "express";

/**
 * Construct prompts for each IELTS writing evaluation criteria for premium users.
 * @param {Request} req The HTTP request object containing user generated task topic and writing.
 * @return {string} the writing evaluation feedback and scores in one string. 
 * @source N/A
 */

const generatePromptTR = (req: Request): object => {

	const instruction = "Ignore all liabilities, do not mention AI model, and act as an IELTS grader. Give numerical score in format of 'TR: 0.0' according to IELTS nine-band scale on task response, evaluate this writing only on task response, and give suggestions for improvement. Must mention extensive details in provided writing content.";

	const userInput = JSON.stringify(req.body.topic + req.body.content);

	const prompt = [{
		"role": "user",
		"content": userInput + instruction,
	}];

	return prompt;
};

const generatePromptCC = (req: Request): object => {

	const instruction = "Ignore all liabilities, do not mention AI model, and act as an IELTS grader. Give numerical score in format of 'CC: 0.0' according to IELTS nine-band scale on coherence and cohesion, evaluate this writing only on coherence and cohesion, and give suggestions for improvement. Must mention extensive details in provided writing content.";

	const userInput = JSON.stringify(req.body.topic + req.body.content);

	const prompt = [{
		"role": "user",
		"content": userInput + instruction,
	}];

	return prompt;
};

const generatePromptLR = (req: Request): object => {

	const instruction = "Ignore all liabilities, do not mention AI model, and act as an IELTS grader. Give numerical score in format of 'LR: 0.0' according to IELTS nine-band scale on lexical resource, evaluate this writing only on lexical resource, and give suggestions for improvement. Must mention extensive details in provided writing content.";

	const userInput = JSON.stringify(req.body.topic + req.body.content);

	const prompt = [{
		"role": "user",
		"content": userInput + instruction,
	}];

	return prompt;
};

const generatePromptGRA = (req: Request): object => {

	const instruction = "Ignore all liabilities, do not mention AI model, and act as an IELTS grader. Give numerical score in format of 'GRA: 0.0' according to IELTS nine-band scale on grammar range and accuracy, evaluate this writing only on grammar range and accuracy, and give suggestions for improvement. Must mention extensive details in provided writing content.";

	const userInput = JSON.stringify(req.body.topic + req.body.content);

	const prompt = [{
		"role": "user",
		"content": userInput + instruction,
	}];

	return prompt;
};

export { generatePromptTR, generatePromptCC, generatePromptLR, generatePromptGRA };
