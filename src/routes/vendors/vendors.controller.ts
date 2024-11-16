import { createVendor, loginVendor } from "../../modules/vendors.module";
import { generateToken } from "../../utils/jwt";

export async function httpPostRegisterVendor(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vendor = await createVendor(name, email, password);
    const token = generateToken({ id: vendor.user_id, email: vendor.email });


    res.status(201).json({ message: "Vendor created successfully", token, vendor });
  } catch (error) {
    if (error.message.includes('Vendor with this email already exists')) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    console.error("Error during signup:", error);
  }
}

export async function httpPostLoginVendor(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const loginResponse = await loginVendor(email, password);
    const token = generateToken({ id: loginResponse.vendor.user_id, email: loginResponse.vendor.email });
    console.log(token);
    req.session.token = token;
    req.session.user = {
      id: loginResponse.vendor.user_id,
      name: loginResponse.vendor.name,
      email: loginResponse.vendor.email
    };

    // req.session.header = token;
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Set secure flag only in production 
    //   maxAge: 3600000 // 1 hour 
    // });

    console.log("Session token set: ", req.session.token);

    res.status(200).json({ message: "Login successful", token, vendor: loginResponse.vendor });
  } catch (error) {
    if (error.message.includes('Vendor not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid password')) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    console.error("Error during login:", error);
  }
}

export async function httpPostLogoutVendor(req, res) {
  req.session.destroy((err) => {
    if (err) { return res.status(500).json({ message: 'Logout failed' }); }
    res.clearCookie('connect.sid', { path: '/' }); // Clear the session cookie 
    return res.status(200).json({ message: 'Logged out successfully' });
  });
}
