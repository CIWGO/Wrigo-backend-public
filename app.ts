import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { handleStripeWebhook } from "./src/controllers/payment";
require("express-async-errors");

const app: Express = express();

app.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*", credentials: true, }));

export default app;
