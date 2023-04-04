/**
 * Send emails to user's email address using AWS SES. To use this function, * make sure to add .aws/credentials with valid AWS credentials in
 * credentials file at the root of this project. credentials file does not
 * have a file extension. 
 * @param {string[]} toAddresses single email (one element in the array) or * email list (array)
 * @param {string} subject email subject
 * @param {string} bodyText email content
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromIni } from "@aws-sdk/credential-provider-ini";

const sendEmail = async (toAddresses: string[], subject: string, bodyText: string) => {

	const credentials = fromIni({
		profile: "default",
		filepath: ".aws/credentials",
	});

	const client = new SESClient({
		region: "ap-southeast-2",
		credentials
	});

	const params = {
		Destination: {
			ToAddresses: toAddresses,
		},
		Message: {
			Body: {
				Text: {
					Data: bodyText,
				},
			},
			Subject: {
				Data: subject,
			},
		},
		Source: "wrigo-account-service@wrigo.com.au",
	};

	try {
		const command = new SendEmailCommand(params);
		const result = await client.send(command);
		console.log(result);
	} catch (error) {
		console.error(error);
	}
};

export { sendEmail };

