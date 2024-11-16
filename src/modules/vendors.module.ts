const { getSession } = require("../services/db");
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

const createVendor = async (name, email, password) => {
  const session = await getSession();

  try {
    // Check if vendor already exists
    const checkQuery = `MATCH (v:Vendor {email: $email}) RETURN v`;
    const checkResult = await session.run(checkQuery, { email });

    if (checkResult.records.length > 0) {
      throw new Error('Vendor with this email already exists');
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID for the vendor
    const id = uuidv4();

    // Create the vendor in Neo4j without storing the salt separately
    const query = `
      CREATE (v:Vendor {user_id: $id, name: $name, email: $email, password: $password})
      RETURN v
    `;
    const params = { id, name, email, password: hashedPassword };
    const result = await session.run(query, params);

    return result.records[0].get("v").properties;
  } catch (err) {
    console.error("Error creating vendor:", err.message);
    throw err; // Ensure the error propagates
  } finally {
    await session.close();
  }
};




const loginVendor = async (email, password) => {
  const session = await getSession();
  console.log("login chala");

  try {
    // Check if the vendor exists
    const query = `MATCH (v:Vendor {email: $email}) RETURN v`;
    const result = await session.run(query, { email });

    if (result.records.length === 0) {
      throw new Error('Vendor not found');
    }

    // Get vendor details
    const vendor = result.records[0].get("v").properties;

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, vendor.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Successful login
    return {
      message: 'Login successful',
      vendor: {
        user_id: vendor.user_id,
        name: vendor.name,
        email: vendor.email
      }
    };
  } catch (err) {
    console.error("Error during login:", err.message);
    throw err;
  } finally {
    await session.close();
  }
};



module.exports = { createVendor, loginVendor };
