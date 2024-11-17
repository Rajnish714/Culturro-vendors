// import { getSession } from '../services/db';

// export const createProduct = async (product, vendor_id) => {

//     const session = getSession();


//     try {
//         const checkQuery = `MATCH (v:Vendor {user_id: $user_id}) RETURN v`;
//         const checkResult = await session.run(checkQuery, { user_id: vendor_id });


//         if (checkResult.records.length <= 0) {
//             throw new Error("vendor_id not matched")

//         }


//         const query = ` CREATE (p:Product { id: apoc.create.uuid(), name: $name, description: 
//     $description, price: $price, category: $category, stockQuantity: $stockQuantity })
//      WITH p MATCH (v:Vendor {user_id: $user_id}) CREATE (v)-[:SELLS]->(p) RETURN p `;
//         const params = {
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             category: product.category,
//             stockQuantity: product.stockQuantity,
//             user_id: vendor_id
//         };
//         const result = await session.run(query, params);
//         return result.records[0].get('p');
//     } catch (error) {
//         console.log(error);

//     }
// }
// models/Product.js
import { getSession } from '../services/db';

export const createProduct = async (product, vendor_id) => {
    const session = getSession();
    try {
        // Check if the vendor exists
        const checkQuery = `MATCH (v:Vendor {user_id: $user_id}) RETURN v`;
        const checkResult = await session.run(checkQuery, { user_id: vendor_id });

        if (checkResult.records.length <= 0) {
            throw new Error("vendor_id not matched");
        }

        // Create the product and link it to the vendor
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
      MATCH (v:Vendor {user_id: $user_id})
      CREATE (v)-[:SELLS]->(p)
      RETURN p
    `;

        const params = {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stockQuantity: product.stockQuantity,
            user_id: vendor_id
        };

        const result = await session.run(query, params);

        // Properly close the session
        session.close();

        if (result.records.length > 0) {
            return result.records[0].get('p');
        } else {
            throw new Error("Failed to create product");
        }
    } catch (error) {
        console.log("Error during product creation:", error);

        // Ensure session is closed in case of error
        session.close();

        throw error; // Propagate the error to handle it in the calling function
    }
};
