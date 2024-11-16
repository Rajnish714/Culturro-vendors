const express = require("express");

const { vendorsRouter } = require("./vendors/vendors.router");
import { productsRouter } from "./products/product.router";
const api = express.Router();


api.use("/auth/vendor", vendorsRouter);
api.use("/vendor/product", productsRouter);

module.exports = api;
