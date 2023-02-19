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
	}
}
