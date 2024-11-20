import { config } from "dotenv"
config()
import http from "http";
import { app } from "./app";
import { getSession, closeConnection } from "./services/db";

const server = http.createServer(app);


async function startServer() {
  try {

    const db = getSession()
    if (!db) {
      throw new Error("Database Connection failed!")
    }


    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    await closeConnection();
    process.exit(1);
  }
}
startServer();
