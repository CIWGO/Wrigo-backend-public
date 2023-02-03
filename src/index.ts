import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import connectToDB from './utils/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

// connectToDB();

connectToDB();

mongoose.connection.once('open', () => {
    console.log('db is connected');
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
