// Index for app entry

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app";
import connectToDB from "./utils/db/dbService";
import { v1Router } from "./routes/index";

dotenv.config();

const PORT = process.env.PORT;

connectToDB();
app.use(v1Router);

mongoose.connection.once("open", () => {
	console.log("db is connected");
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
