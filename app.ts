import express, { Express } from "express";

require("express-async-errors");

const app: Express = express();

app.use(express.json());

export default app;
