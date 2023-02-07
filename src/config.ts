import path from "path";
import dotenv from "dotenv";

// Code source: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
// Parsing .env file and converting it into our own custom Config type

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  PORT?: number;
  CONNECTION_STRING?: string;
  CIW_COLLECTION_NAME?: string;
  OPENAI_APIKEY?: string;
}

interface Config {
  PORT: number;
  CONNECTION_STRING: string;
  CIW_COLLECTION_NAME: string;
  OPENAI_APIKEY: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3005,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    CIW_COLLECTION_NAME: process.env.CIW_COLLECTION_NAME,
    OPENAI_APIKEY: process.env.OPENAI_APIKEY
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  const configs = Object.entries(config);
  configs.forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  });
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;