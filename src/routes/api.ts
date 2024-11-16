import express from "express";

import { vendorsRouter } from "./vendors/vendors.router";
import { productsRouter } from "./products/product.router";
const api = express.Router();


api.use("/auth/vendor", vendorsRouter);
api.use("/vendor/product", productsRouter);

export { api }
