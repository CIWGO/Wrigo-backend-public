import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("express-async-errors");

const app: Express = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*",credentials:true,}));

export default app;
