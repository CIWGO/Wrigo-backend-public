import express, { Express } from "express";
import { v1Router } from "./routes/index";

require("express-async-errors");

const app: Express = express();

app.use(express.json());
app.use("/v1", v1Router);

export default app;
