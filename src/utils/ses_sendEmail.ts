
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromIni } from "@aws-sdk/credential-provider-ini";

const client = new SESClient({ region: "ap-southeast-2", credentials: fromIni({
	profile: "default",
	filepath: "../../.aws/credentials"
})});

const sendEmail = async () => {
	const params = {
		Destination: {
			ToAddresses: ["leoyh.97@gmail.com"],
		},
		Message: {
			Body: {
				Html: {
					Data: "<p>Hello World!</p>",
				},
				Text: {
					Data: "Hello World!",
				},
			},
			Subject: {
				Data: "Test Email",
			},
		},
		Source: "notification@wrigo.com.au",
	};

	try {
		const command = new SendEmailCommand(params);
		const result = await client.send(command);
		console.log(result);
	} catch (error) {
		console.error(error);
	}
};

sendEmail();

  