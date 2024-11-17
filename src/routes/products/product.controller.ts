import { createProduct, findProductsByVendorId } from "../../modules/products.module"

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
    // Assuming the product name is passed as a query parameter 
    try {
        const products = await findProductsByVendorId(req.user.id, name ? name.toString() : null); // Ensure req.user contains the authenticated user's info
        res.status(200).json(products);
    } catch (error) {
        console.error("Error finding products:", error);
        res.status(400).json({ message: error.message });
    }
};