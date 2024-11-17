import express from "express";

import { httpPostCreateProduct } from "./product.controller" // in get req httpGetAllProducts
const productsRouter = express.Router();
productsRouter.post("/create", httpPostCreateProduct)
//productsRouter.get("/product", httpGetAllProducts);

export { productsRouter }
