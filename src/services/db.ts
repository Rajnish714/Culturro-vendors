import * as neo4j from "neo4j-driver";

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !user || !password) {
  throw new Error('Missing Neo4j connection details');
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const getSession = () => {
  const session = driver.session();
  return session;
};

const closeConnection = async () => {
  try {
    await driver.close();
    console.log("Disconnected from Neo4j AuraDB!");
  } catch (error) {
    console.error("Error during Neo4j disconnection:", error);
  }
};

export { getSession, closeConnection };

