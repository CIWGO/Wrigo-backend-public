import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
//import connectToDB from "./utils/db";

//import express from "express";
import { connectToDatabase } from "./utils/dbService"
import { usersRouter } from "./routes/usersRoutes";

dotenv.config();

const PORT = process.env.PORT;

// connectToDB();

// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
connectToDatabase()
  .then(() => {
    app.use("/users", usersRouter);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

mongoose.connection.once('open', () => {
  console.log('db is connected');
})

// app.listen(PORT, () => {
//   console.log(`server listening on port ${PORT}`);
// });
