const express = require("express");

require("express-async-errors");
const v1Router = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/v1", v1Router);

module.exports = app;
