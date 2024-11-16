import { getAllProducts } from "../../modules/products.module"

export async function httpGetAllProducts(req, res) {
    const products = await getAllProducts("products 123")
    res.status(400).json({
        message:
            "data hai ye ",
        data: products
    }
    )
}