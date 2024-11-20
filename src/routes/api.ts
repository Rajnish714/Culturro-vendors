import express from "express";

import { vendorsRouter } from "./vendors/vendors.router";
import { productsRouter } from "./products/product.router";
import { isVendorLogin, verifyTokenOnload } from "../middleware/auth"
const api = express.Router();


api.use("/auth/vendor", vendorsRouter);
api.use("/vendor/product", verifyTokenOnload, isVendorLogin, productsRouter);

export { api }
