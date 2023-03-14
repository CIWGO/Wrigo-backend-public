import { Request } from "express";
import outputFormat from "./outputFormat.json";

// Revise import path accordingly if necessary
// change the file name to promptGeneration
// generate a prompt for evaluation

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

const generatePrompt = (req: Request) => {
	// change the name to generatePrompt
	const instruction =
    "Evaluate IELTS writing on nine-band scale of JSON. Return JSON following this format:";
	const evaluateOutputFormat = JSON.stringify(
		outputFormat.evaluateOutputFormat
	);
	const userInput = JSON.stringify(req.body.topic + req.body.content);
	// const prompt = instruction + evaluateOutputFormat + userInput;
	const prompt = [
		{
			role: "user",
			content: instruction + evaluateOutputFormat + userInput,
		},
	];

	return prompt;
};

// generate sample writing and feedback
const generateSamplePrompt = (req: Request) => {
	// prompt to generate sample writing AND evaluation
	const instruction =
    "Generate a IELTS task-2 7.5 band writing sample of about 250 words according to the topic, and evaluate the writing sample on nine-band scale of JSON. Return JSON following this format:";
	const sampleFeedback = JSON.stringify(outputFormat);
	const userInput = JSON.stringify(req.body.topic);
	const prompt = [
		{
			role: "user",
			content: userInput + instruction + sampleFeedback,
		},
	];
	return prompt;
};
export { generatePrompt, generateSamplePrompt};
