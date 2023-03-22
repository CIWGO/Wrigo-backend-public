import express, { Express } from "express";
import cors from "cors";

require("express-async-errors");

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: "*",credentials:true,}));

export default app;
