import express from "express";

import { httpPostCreateProduct, httpGetProductsByVendorId, httpDeleteProduct, httpUpdateProduct } from "./product.controller" // in get req httpGetAllProducts
const productsRouter = express.Router();
productsRouter.post("/create", httpPostCreateProduct)
//productsRouter.get("/product", httpGetAllProducts);
productsRouter.get('/products', httpGetProductsByVendorId);
productsRouter.put('/update/:product_id', httpUpdateProduct)
productsRouter.delete("/delete/:product_id", httpDeleteProduct)

export { productsRouter }
