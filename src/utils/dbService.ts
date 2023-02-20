import mongoose from "mongoose";
import config from "../../config";

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

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
