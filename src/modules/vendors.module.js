const {getSession} = require("../services/db");

const createVendor = async (name, email, password) => {
  const session = await getSession();

  try {
    const query = `
      CREATE (v:Vendor {name: $name, email: $email, password: $password})
      RETURN v
    `;
    const params = {name, email, password};
    const result = await session.run(query, params);
    return result.records[0].get("v").properties;
  } catch (err) {
    console.log(err);
  } finally {
    await session.close();
  }
};

module.exports = {createVendor};
