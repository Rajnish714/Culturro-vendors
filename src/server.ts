require("dotenv").config();
const http = require("http");
const app = require("./app");
const {getSession, closeConnection} = require("./services/db");

const server = http.createServer(app);

// async function startServer() {
//   await getSession();

//   await closeConnection();

//   server.listen(8000, () => {
//     console.log(`server has started on ${8000}...`);
//   });
// }

async function startServer() {
  try {
    // Connect to Neo4j AuraDB
    await getSession();

    // Start the server
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
