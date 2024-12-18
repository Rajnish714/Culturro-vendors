import { getSession } from "../services/db";


export const createProduct = async (product, vendor_id) => {
    const session = getSession();
    try {

        const checkQuery = `MATCH (v:Vendor {vendor_id: $vendor_id}) RETURN v`;
        const checkResult = await session.run(checkQuery, { vendor_id: vendor_id });

        if (checkResult.records.length <= 0) {
            throw new Error("vendor_id not matched");
        }


        const query = `
      CREATE (p:Product {
        id: apoc.create.uuid(),
        name: $name,
        description: $description,
        price: $price,
        category: $category,
        stockQuantity: $stockQuantity,
        createdAt: timestamp(),
        updatedAt: timestamp()
      })
      WITH p
      MATCH (v:Vendor {vendor_id: $vendor_id})
      CREATE (v)-[:SELLS]->(p)
      RETURN p
    `;

        const params = {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stockQuantity: product.stockQuantity,
            vendor_id: vendor_id,
        };

        const result = await session.run(query, params);
        session.close();

        if (result.records.length > 0) {
            return result.records[0].get("p");
        } else {
            throw new Error("Failed to create product");
        }
    } catch (error) {
        console.log("Error during product creation:", error);
        session.close();
        throw error;
    }
};



export const getAllProducts = async (vendor_id: string, productName = null) => {
    console.log(productName);

    const session = getSession();
    try {
        let query = ` MATCH (v:Vendor {vendor_id: $vendor_id})-[:SELLS]->(p:Product) `;
        const params: { vendor_id: string; productName?: string } = {
            vendor_id: vendor_id,
        };
        if (productName) {
            query += ` WHERE p.name CONTAINS $productName `;
            params.productName = productName;
            console.log(params);
        }
        query += ` RETURN p `;
        const result = await session.run(query, params);
        console.log(result);

        session.close();
        const products = result.records.map((record) => record.get("p").properties);
        return products;
    } catch (error) {
        console.log("Error during finding products:", error);
        session.close();
        throw error;
    }
};

export const getAllProductsByVendorId = async (
    product_id: string,
    vendor_id: string
) => {
    const session = getSession();
    try {
        const query = ` MATCH (v:Vendor {vendor_id: $vendor_id})-[:SELLS]->(p:Product {id: $product_id})
              RETURN p `;
        const params = { product_id, vendor_id };
        const result = await session.run(query, params);
        if (result.records.length <= 0) {
            throw new Error("no matching product");
        }

        session.close();
        const products = result.records.map((record) => record.get("p").properties);
        return products;
    } catch (error) {
        console.log("Error during finding products:", error);
        session.close();
        throw error;
    }
};

export const updateProductById = async (
    product_id: string,
    vendor_id: string,
    updates: {
        name?: string;
        description?: string;
        price?: string;
        category?: string;
        stockQuantity?: number;
        images?: string[];
    }
) => {
    const session = getSession();

    try {
        let setClauses = [];
        let params: { [key: string]: any } = { product_id, vendor_id };

        if (updates.name) {
            setClauses.push("p.name = $name");
            params.name = updates.name;
        }
        if (updates.description) {
            setClauses.push("p.description = $description");
            params.description = updates.description;
        }
        if (updates.price) {
            setClauses.push("p.price = $price");
            params.price = updates.price;
        }
        if (updates.category) {
            setClauses.push("p.category = $category");
            params.category = updates.category;
        }
        if (updates.stockQuantity) {
            setClauses.push("p.stockQuantity = $stockQuantity");
            params.stockQuantity = updates.stockQuantity;
        }

        const setClause = setClauses.join(", ");

        const query = `
        MATCH (v:Vendor {vendor_id: $vendor_id})-[:SELLS]->(p:Product {id: $product_id})
        SET ${setClause}, p.updatedAt = timestamp()
        RETURN p
      `;

        const result = await session.run(query, params);
        session.close();

        return result.records[0]?.get("p").properties;
    } catch (error) {
        console.log("Error during updating product:", error);
        session.close();
        throw error;
    }
};

export const deleteProductById = async (
    product_id: string,
    vendor_id: string
) => {
    const session = getSession();
    try {
        const query = ` MATCH (v:Vendor {vendor_id: $vendor_id})-[:SELLS]->(p:Product {id: $product_id})
          DETACH DELETE p `;
        const params = { product_id, vendor_id };
        const result = await session.run(query, params);
        session.close();
        return result.summary.counters.updates().nodesDeleted;
    } catch (error) {
        console.log("Error during deleting product:", error);
        session.close();
        throw error;
    }
};
