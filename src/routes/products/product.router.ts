import express from "express";

import { httpPostCreateProduct, httpGetProductsByVendorId } from "./product.controller" // in get req httpGetAllProducts
const productsRouter = express.Router();
productsRouter.post("/create", httpPostCreateProduct)
//productsRouter.get("/product", httpGetAllProducts);
productsRouter.get('/products', httpGetProductsByVendorId);

export { productsRouter }
