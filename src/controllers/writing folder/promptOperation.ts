import { Request } from "express";
import outputFormat from "./outputFormat.json";

// generate a prompt for evaluation
const generatePromptForEvaluation = (req: Request) => {
	const instruction = "Evaluate IELTS writing on nine-band scale of JSON. Return JSON following this format:";
	const evaluateOutputFormat = JSON.stringify(outputFormat.evaluateOutputFormat);
	const userInput = JSON.stringify(req.body);
	const prompt = instruction + evaluateOutputFormat + userInput;
	return prompt;
};

export { generatePromptForEvaluation };