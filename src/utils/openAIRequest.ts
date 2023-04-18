// import axios from "axios";
// import config from "../../config";

// const URL = config.OPENAI_APIURL;
// const apiKey = config.OPENAI_APIKEY;

// const openAIRequest = async (prompt: any, returnString: boolean) => {
// 	let tokenLength = 0;
// 	let tempDiff = 1.0;

// 	if (returnString === false) {
// 		tokenLength = 3500;
// 		tempDiff = 0.6;
// 	} else if (returnString === true) {
// 		tokenLength = 3000;
// 	}

// 	try {
// 		const response = await axios({
// 			method: "POST",
// 			url: URL,
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Authorization": `Bearer ${apiKey}`,
// 			},
// 			data: {
// 				model: "gpt-3.5-turbo",
// 				messages: prompt,
// 				temperature: tempDiff,
// 				max_tokens: tokenLength,
// 			},
// 		});

// 		if (returnString === false) {
// 			// check if the response can be suit as JSON format
// 			if (isJSON(response.data.choices[0].message.content)) {
// 				return JSON.parse(response.data.choices[0].message.content);
// 			} else {
// 				throw new Error("Cannot get the right response");
// 			}
// 			// return response;
// 		} else if (returnString === true) {
// 			return response.data.choices[0].message.content;
// 		}

// 	} catch (error) {
// 		console.error("Error making request to OpenAI API:", error.message);
// 		console.error("Error stack:", error.stack);
// 		return error;
// 	}
// };

// const isJSON = (response: any): boolean => {
// 	try {
// 		JSON.parse(JSON.stringify(response));
// 		return true;
// 	} catch (error) {
// 		return false;
// 	}
// };

// export { openAIRequest };


import axios from "axios";
import config from "../../config";

const URL = config.OPENAI_APIURL;
const apiKey = config.OPENAI_APIKEY;

const openAIRequest = async (prompt: any, returnString: boolean) => {
	console.log("openai request running");
	let tokenLength = 0;

	if (returnString === false) {
		tokenLength = 2000;
	} else if (returnString === true) {
		tokenLength = 3000;
	}

	try {
		const response = await axios({
			method: "POST",
			url: URL,
			headers: {
				"Content-Type": "application/json",
				"organization": "org-zNOMagdhlU4unIGkFLv5VvnH",
				"Authorization": `Bearer ${apiKey}`,
			},
			data: {
				model: "gpt-3.5-turbo",
				messages: prompt,
				temperature: 1.0,
				max_tokens: tokenLength,
			},
		});
		console.log("openai request running: " + response.data);

		if (returnString === false) {
			// check if the response can be suit as JSON format
			if (isJSON(response.data.choices[0].message.content)) {
				return JSON.parse(response.data.choices[0].message.content);
			} else {
				throw new Error("Cannot get the right response");
			}
			// return response;
		} else if (returnString === true) {
			return response.data.choices[0].message.content;
		}

	} catch (error) {
		console.error("Error making request to OpenAI API:", error.message);
		console.error("Error stack:", error.stack);
		return error;
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