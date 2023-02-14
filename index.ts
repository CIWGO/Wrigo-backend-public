import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import connectToDB from "./src/utils/dbService";
import { userRouter } from "./src/routes/userRouter";
import { apiRouter } from "./src/routes/apiRouter";

dotenv.config();

const PORT = process.env.PORT;

connectToDB();
app.use(userRouter);
app.use(apiRouter);

mongoose.connection.once("open", () => {
	console.log("db is connected");
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
