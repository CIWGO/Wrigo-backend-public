// Code source: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
// Extend the ProcessEnv interface with our custom env variables.

namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		CONNECTION_STRING: string;
		CIW_COLLECTION_NAME: string;
		OPENAI_APIKEY: string;
		OPENAI_APIURL: string;
		JWT_SECRET: string;
		STRIPE_PUBLIC_KEY: string;
		STRIPE_SECRET_KEY: string
		STRIPE_PRODUCT_ID: string
		STRIPE_PAYMENT_URL: string
		STRIPE_WEBHOOK_SECRET: string
	}
}
