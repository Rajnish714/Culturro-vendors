const express = require("express");
const {httpPostRegisterVendor} = require("./vendors.controller");

const vendorsRouter = express.Router();

vendorsRouter.post("/", httpPostRegisterVendor);

module.exports = {vendorsRouter};
