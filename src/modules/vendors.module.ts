import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { getSession } from '../services/db';

interface Vendor {
  vendor_id: string;
  name: string;
  email: string;
  password?: string;
}

const createVendor = async (name: string, email: string, password: string): Promise<Vendor> => {
  const session = getSession();

  try {
    const checkQuery = `MATCH (v:Vendor {email: $email}) RETURN v`;
    const checkResult = await session.run(checkQuery, { email });

    if (checkResult.records.length > 0) {
      throw new Error('Vendor with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const query = `
      CREATE (v:Vendor {vendor_id: $id, name: $name, email: $email, password: $password})
      RETURN v
    `;
    const params = { id, name, email, password: hashedPassword };
    const result = await session.run(query, params);

    return result.records[0].get("v").properties as Vendor;
  } catch (err) {
    console.error("Error creating vendor:", err.message);
    throw err;
  } finally {
    await session.close();
  }
};

const loginVendor = async (email: string, password: string): Promise<{ message: string; vendor: Vendor }> => {
  const session = getSession();

  try {
    const query = `MATCH (v:Vendor {email: $email}) RETURN v`;
    const result = await session.run(query, { email });

    if (result.records.length === 0) {
      throw new Error('Vendor not found');
    }

    const vendor = result.records[0].get("v").properties as Vendor;
    const passwordMatch = await bcrypt.compare(password, vendor.password);
    console.log(vendor, "ye hai ");

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    return {
      message: 'Login successful',
      vendor: {
        vendor_id: vendor.vendor_id,
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

export { createVendor, loginVendor };


