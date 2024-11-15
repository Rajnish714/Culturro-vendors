const neo4j = require("neo4j-driver");

const uri = process.env.NEO4J_URI;
console.log("this is uri=============", uri);

const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const getSession = () => {
  return driver.session();
};

const closeConnection = async () => {
  await driver.close();
};

module.exports = {getSession, closeConnection};
