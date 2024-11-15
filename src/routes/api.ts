const express = require("express");

const {vendorsRouter} = require("./vendors/vendors.router");
const api = express.Router();

api.use("/signup", vendorsRouter);

module.exports = api;
