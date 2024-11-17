//import session from "express-session";
//import cookieSession from "cookie-session";
//app.use(morgan("combined"));
//const morgan = require("morgan");


import express from "express";
import path from "path";
import cors from "cors";
import { api } from "./routes/api";
import { verifyTokenOnload } from "./middleware/auth" //isVendorLogin if needed
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());



app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "..", "public")));


app.use(verifyTokenOnload)
app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export { app }
























// app.use(session({
//   secret: 'your-session-secret', // Replace with a secure session secret
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'development', // Use true in production with HTTPS
//     httpOnly: true, // Ensure cookies are accessible only through the HTTP protocol
//     maxAge: 3600000 // 1 hour
//   }
// }));

// // app.use(
// //   cookieSession({
// //     name: "session", // Name of the cookie
// //     keys: [process.env.SESSION_SECRET || "fallback-secret"], // Key for signing
// //     maxAge: 24 * 60 * 60 * 1000, // 24 hours
// //     secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
// //     httpOnly: true, // Prevent JavaScript access to cookies
// //   })
// // );