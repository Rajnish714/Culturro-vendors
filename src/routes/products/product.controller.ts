import { createProduct } from "../../modules/products.module"

export async function httpPostCreateProduct(req, res) {

    const products = req.body
    // console.log(products);

    const userId = req.user
    console.log("ye aaya", userId);

    if (!userId || !userId.id) { return res.status(400).json({ message: 'User ID is missing' }); }


    try {

        if (!products) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await createProduct(products, userId.id)
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


