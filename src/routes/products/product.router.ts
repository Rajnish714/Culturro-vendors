import express from "express";

import { httpGetAllProducts } from "./product.controller"
const productsRouter = express.Router();
productsRouter.get("/product", httpGetAllProducts);

export { productsRouter }
