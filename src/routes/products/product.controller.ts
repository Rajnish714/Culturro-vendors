import { createProduct, findProductsByVendorId, deleteProductById, updateProductById } from "../../modules/products.module"

export async function httpPostCreateProduct(req, res) {

    const products = req.body
    const userId = req.user

    if (!userId || !userId.id) {
        return res.status(400).json({ message: 'User ID is missing' });
    }

    try {

        if (!products) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await createProduct(products, userId.id)
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

//---------------get Vendor Product-------------------------


export const httpGetProductsByVendorId = async (req, res) => {
    const { name } = req.query;
    //  product name is passed as a query parameter 
    try {
        const products = await findProductsByVendorId(req.user.id, name ? name.toString() : null); // Ensure req.user contains the authenticated user's info
        res.status(200).json(products);
    } catch (error) {
        console.error("Error finding products:", error);
        res.status(400).json({ message: error.message });
    }
};


//---------------update product-------------------------------------


export const httpUpdateProduct = async (req, res) => {
    const { product_id } = req.params; // Assuming the product ID is passed as a URL parameter
    const updates = req.body; // Assuming the updates are sent in the request body
    console.log("ye hai data", updates);

    try {
        const updatedProduct = await updateProductById(product_id, req.user.id, updates); // Ensure req.user contains the authenticated user's info

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: error.message });
    }
};



//-------------delete product------------------------------------------

export const httpDeleteProduct = async (req, res) => {
    const { product_id } = req.params; // Assuming the product ID is passed as a URL parameter
    console.log("ye hai product id", product_id);

    try {
        const nodesDeleted = await deleteProductById(product_id, req.user.id); // Ensure req.user contains the authenticated user's info

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