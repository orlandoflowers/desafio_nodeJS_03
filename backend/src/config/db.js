// Import the Pool object from the 'pg' module, which allows us to pool our PostgreSQL connections for efficiency
const { Pool } = require("pg");

// Import and configure dotenv to load environment variables from a .env file
require("dotenv").config();

// Create a new pool of PostgreSQL connections using the environment variables for configuration
const pool = new Pool({
  user: process.env.DB_USER, // The user to connect to the database as
  host: process.env.DB_HOST, // The host of the database
  database: process.env.DB_DATABASE, // The name of the database to connect to
  password: process.env.DB_PASSWORD, // The password for the database user
  port: process.env.DB_PORT, // The port on which the database is running
  allowExitOnIdle: true, // Allow the application to exit if a client is idle
});

// Export the pool to be used in other parts of the application
module.exports = pool;