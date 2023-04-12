import { Request, Response } from "express";
import { openAIRequest } from "../../utils/openAIRequest";

const grammarPrompt = (text:string): object => {

	const instruction = "Ignore all liabilities, do not mention AI model, and act as an grammar corecter for IELTS writing task. Focus on the detials of the grammar. Do not give any comment, only provide the correct grammar version of the below text. ";
	const userInput = JSON.stringify(text );

	const prompt = [{
		"role": "user",
		"content": userInput + instruction,
	}];

	return prompt;
};


const grammarFix = async (req: Request, res: Response) => { 
  try {

    const { text } = req.body;
    const promptGrammarFix = grammarPrompt(text);
    const responseCorrectedGrammar = await openAIRequest(promptGrammarFix, true);
    // const regexText = /Content:\s*([\s\S]+)/i;
    // const match = responseCorrectedGrammar.match(regexText);
    // const resContent = match ? match[1] : "";   
    return res.status(200).json({ content: responseCorrectedGrammar });
  } catch(error) { 
    return res.status(500).json({ error: error.message || "Failed to get corrected text" });
  }
  

};

export {grammarFix} ;