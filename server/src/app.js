const express = require("express");
//const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const api = require("./routes/api");

const app = express();
app.use(cors());
//app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/v1", api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
