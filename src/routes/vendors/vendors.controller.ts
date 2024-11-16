const { createVendor, loginVendor } = require("../../modules/vendors.module");



async function httpPostRegisterVendor(req, res) {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vendor = await createVendor(name, email, password); //  `createVendor` interacts with Neo4j
    res.status(201).json({ message: "Vendor created successfully", vendor });

  } catch (error) {


    if (error.message.includes('Vendor with this email already exists')) {
      res.status(409).json({ message: error.message });

      // Conflict status code
    } else {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

  }
}



async function httpPostLoginVendor(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const loginResponse = await loginVendor(email, password); // `loginVendor` interacts with Neo4j
    res.status(200).json(loginResponse);

  } catch (error) {
    if (error.message.includes('Vendor not found')) {
      res.status(404).json({ message: error.message }); // Not Found status code
    } else if (error.message.includes('Invalid password')) {
      res.status(401).json({ message: error.message }); // Unauthorized status code
    } else {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    console.error("Error during login:", error); // Log the actual error
  }
}




module.exports = { httpPostRegisterVendor, httpPostLoginVendor };
