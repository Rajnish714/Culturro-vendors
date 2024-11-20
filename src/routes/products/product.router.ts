import express from "express";

import { httpPostCreateProduct, httpGetAllProducts, httpGetProductsByVendorId, httpDeleteProduct, httpUpdateProduct } from "./product.controller";
const productsRouter = express.Router();
productsRouter.post("/create", httpPostCreateProduct)
productsRouter.get("/products/", httpGetAllProducts);
productsRouter.get('/products/:product_id', httpGetProductsByVendorId);
productsRouter.put('/update/:product_id', httpUpdateProduct)
productsRouter.delete("/delete/:product_id", httpDeleteProduct)

export { productsRouter }
