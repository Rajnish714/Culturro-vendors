require("dotenv").config();
const http = require("http");
const app = require("./app");
const {getSession, closeConnection} = require("./services/db");

const server = http.createServer(app);

async function startServer() {
  const session = getSession();

  try {
    const result = await session.run(
      'RETURN "Connected to Neo4j AuraDB" AS message'
    );
    console.log(result.records[0].get("message"));
  } catch (error) {
    console.error("Error connecting to Neo4j:", error);
  } finally {
    await session.close();
    await closeConnection();
  }

  server.listen(8000, () => {
    console.log(`server has started on ${8000}...`);
  });
}

startServer();
