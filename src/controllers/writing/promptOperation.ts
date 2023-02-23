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
	const userInput = JSON.stringify(req.body);
	const prompt = instruction + evaluateOutputFormat + userInput;
	return prompt;
};

export { generatePrompt };
