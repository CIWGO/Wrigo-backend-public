import mongoose from "mongoose";
import config from "../config";

const connectToDB = () => {
  const connectionString = config.CONNECTION_STRING;

  if (!connectionString) {
    console.error("connection string is undefined");
    process.exit(1);
  }
  const db = mongoose.connection;
  db.on("connected", () => {
    console.log(`DB connected, ${connectionString}`);
  });
  db.on("error", (error) => {
    console.error(error);
    process.exit(2);
  });
  db.on("disconnected", () => {
    console.log("db disconnected");
  });

  return mongoose.connect(connectionString);
};

export default connectToDB;
