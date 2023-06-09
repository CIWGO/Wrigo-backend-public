import dotenv from "dotenv";

// Code source: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
// Parsing .env file and converting it into our own custom Config type

// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
	PORT?: number;
	CONNECTION_STRING?: string;
	CIW_COLLECTION_NAME?: string;
	OPENAI_APIURL?: string;
	OPENAI_APIKEY?: string;
	JWT_SECRET?: string;
	STRIPE_PUBLIC_KEY?: string;
	STRIPE_SECRET_KEY?: string
	STRIPE_PRODUCT_ID?: string
	STRIPE_PAYMENT_URL?: string
	STRIPE_WEBHOOK_SECRET?: string
}

interface Config {
	PORT: number;
	CONNECTION_STRING: string;
	CIW_COLLECTION_NAME: string;
	OPENAI_APIURL: string;
	OPENAI_APIKEY: string;
	JWT_SECRET?: string;
	STRIPE_PUBLIC_KEY?: string;
	STRIPE_SECRET_KEY?: string;
	STRIPE_PRODUCT_ID?: string;
	STRIPE_PAYMENT_URL?: string;
	STRIPE_WEBHOOK_SECRET?: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		PORT: process.env.PORT ? Number(process.env.PORT) : 3005,
		CONNECTION_STRING: process.env.CONNECTION_STRING,
		CIW_COLLECTION_NAME: process.env.CIW_COLLECTION_NAME,
		OPENAI_APIKEY: process.env.OPENAI_APIKEY,
		OPENAI_APIURL: process.env.OPENAI_APIURL,
		JWT_SECRET: process.env.JWT_SECRET,
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID,
		STRIPE_PAYMENT_URL: process.env.STRIPE_PAYMENT_URL,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
	};
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
	const configs = Object.entries(config);
	configs.forEach(([key, value]) => {
		if (!value) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	});
	return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
