
import express from "express";
import session from "express-session";
import cookieSession from "cookie-session";

//const morgan = require("morgan");
import path from "path";
import cors from "cors";

import { api } from "./routes/api";
import { isVendorLogin, verifyTokenOnload } from "./middleware/auth"
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());
//app.use(morgan("combined"));


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
// app.use(cookieSession({
//   name: 'session', // Name of the cookie to set 
//   keys: ['your-secret-key'], // Secret key for signing the cookie
//   maxAge: 24 * 60 * 60 * 1000, // 24 hours 
//   secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS 
//   httpOnly: true // Ensure cookies are accessible only through the HTTP protocol
// }));
app.use(session({
  secret: 'your-session-secret', // Replace with a secure session secret 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS 
    httpOnly: true, // Ensure cookies are accessible only through the HTTP protocol 
    maxAge: 3600000 // 1 hour 
  }
}));

app.use(verifyTokenOnload)
app.use("/v1", isVendorLogin, api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export { app }
