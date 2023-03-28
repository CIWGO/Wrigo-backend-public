import axios from "axios";
import config from "../../config";

const URL = config.OPENAI_APIURL;
const apiKey = config.OPENAI_APIKEY;

const openAIRequest = async (prompt: any, returnString: boolean, maxRetries = 3) => {
	try {
		const response = await axios({
			method: "POST",
			url: URL,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${apiKey}`,
			},
			data: {
				model: "gpt-3.5-turbo",
				messages: prompt,
				temperature: 1.5,
				max_tokens: 2000,
			},
		});

		if (!returnString) {
			// check if the response can be suit as JSON format
			if(isJSON(response.data.choices[0].message.content)) {
				return JSON.parse(response.data.choices[0].message.content);
			} else {
				throw new Error("Cannot get the right response");
			}
			// return response;
		} else if (returnString) {
			return JSON.stringify(JSON.parse(response.data.choices[0].message.content));
		}

	} catch (error) {
		if (maxRetries <= 0) {
			console.log(error);
			throw new Error("Maximum number of retries reached.");
		} else {
			return await openAIRequest(prompt, returnString, maxRetries - 1);
		}
	}
};

const isJSON = (response: any): boolean => {
	try {
		JSON.parse(JSON.stringify(response));
		return true;
	} catch (error) {
		return false;
	}
};

export { openAIRequest };