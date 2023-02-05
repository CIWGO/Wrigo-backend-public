// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import config from "../config";

const connectionString = config.CONNECTION_STRING;
const dbName = config.DB_NAME;
const ciwCollectionName = config.CIW_COLLECTION_NAME

// Global Variables
export const collections: { users?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(dbName);
 
  const usersCollection: mongoDB.Collection = db.collection(ciwCollectionName);

collections.users = usersCollection;
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}