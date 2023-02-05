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
  PORT: number | undefined;
  CONNECTION_STRING: string | undefined;
  DB_NAME: string | undefined;
  CIW_COLLECTION_NAME: string | undefined;
}

interface Config {
  PORT: number;
  CONNECTION_STRING: string;
  DB_NAME: string;
  CIW_COLLECTION_NAME: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME,
    CIW_COLLECTION_NAME: process.env.CIW_COLLECTION_NAME
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;