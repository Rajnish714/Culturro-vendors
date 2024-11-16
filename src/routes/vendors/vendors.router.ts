const express = require("express");
const { httpPostRegisterVendor, httpPostLoginVendor } = require("./vendors.controller");

const vendorsRouter = express.Router();

vendorsRouter.post("/signup", httpPostRegisterVendor);
vendorsRouter.post("/login", httpPostLoginVendor);


module.exports = { vendorsRouter };
