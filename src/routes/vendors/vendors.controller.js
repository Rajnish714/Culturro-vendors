const {createVendor} = require("../../modules/vendors.module");

async function httpPostRegisterVendor(req, res) {
  const {name, email, password} = req.body;
  console.log(name, email, password);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }

    const vendor = await createVendor(name, email, password); // Assuming `createVendor` interacts with Neo4j
    res.status(201).json({message: "Vendor created successfully", vendor});
  } catch (error) {
    console.error("Error during signup:", error); // Log the actual error
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
  //   try {
  //     const vendor = await createVendor(name, email, password);
  //     return res
  //       .status(201)
  //       .json({message: "Vendor created successfully", vendor});
  //   } catch (error) {
  //     return res.status(500).json({message: "Error creating vendor", error});
  //   }
}

module.exports = {httpPostRegisterVendor};
