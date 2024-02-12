// Import the necessary modules
const express = require("express");
const cors = require("cors");

// Create an Express application
const app = express();

// Import the routes from the 'routes' module
const routes = require("./src/routes/route");

// Set the port for the server to listen on, defaulting to 3000 if no environment variable is set
const PORT = process.env.PORT || 3000;

// Use the JSON middleware to automatically parse JSON request bodies
app.use(express.json());

// app.use(express.errorHandler())

// Use the CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Use the imported routes for all paths
app.use("/", routes);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ 
      message: "Error al actualizar los datos",
      error: err.message 
    });
  });

// Start the server, listening on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));