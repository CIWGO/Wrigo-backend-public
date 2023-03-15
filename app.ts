import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("express-async-errors");

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

export default app;
