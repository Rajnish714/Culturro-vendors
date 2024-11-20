import express from "express";
import path from "path";
import cors from "cors";
import { api } from "./routes/api";

import cookieParser from "cookie-parser";
const app = express();
app.use(cors());



app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "..", "public")));



app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export { app }
