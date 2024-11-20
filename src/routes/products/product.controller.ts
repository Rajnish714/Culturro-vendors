import { createProduct, getAllProducts, getAllProductsByVendorId, deleteProductById, updateProductById } from "../../modules/products.module"

export async function httpPostCreateProduct(req, res) {

    const products = req.body
    console.log(products, "ye aaya product");

    const vendorId = req.user

    if (!vendorId || !vendorId.id) {
        return res.status(400).json({ message: 'User ID is missing' });
    }

    try {

        if (!products) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await createProduct(products, vendorId.id)
        console.log(product);

        res.status(201).json({ message: "product successfully added", product }
        )

    } catch (error) {
        if (error.message.includes('Vendor with this email already exists')) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
        console.error("Error during signup:", error);
    }
}


export const httpGetAllProducts = async (req, res) => {
    const { name } = req.query;

    try {
        const products = await getAllProducts(req.user.id, name ? name.toString() : null);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error finding products:", error);
        res.status(400).json({ message: error.message });
    }
};

export const httpGetProductsByVendorId = async (req, res) => {
    const { product_id } = req.params;
    console.log(product_id);


    try {
        const products = await getAllProductsByVendorId(product_id, req.user.id);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error finding products:", error);
        res.status(400).json({ message: error.message });
    }
};




export const httpUpdateProduct = async (req, res) => {
    const { product_id } = req.params;
    const updates = req.body;

    try {
        const updatedProduct = await updateProductById(product_id, req.user.id, updates);

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
};





export const httpDeleteProduct = async (req, res) => {
    const { product_id } = req.params;
    console.log("ye hai product id", product_id);

    try {
        const nodesDeleted = await deleteProductById(product_id, req.user.id);

        if (nodesDeleted > 0) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(400).json({ message: error.message });
    }
};