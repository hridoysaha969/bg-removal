import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

// APP CONFIGUE
const PORT = process.env.PORT || 4000;
const app = express();

// await connectDB();

// // INITIALIZE MIDDLEWARE
// app.use(express.json());
// app.use(cors());

// // API ROUTES
// app.get("/", (req, res) => res.send("Api working"));

// app.listen(PORT, () => console.log("server running on port " + PORT));

// WRAP IN AN ASYNC FUNCTION
const startServer = async () => {
  try {
    // CONNECT TO DATABASE
    await connectDB();

    // INITIALIZE MIDDLEWARE
    app.use(express.json());
    app.use(cors());

    // API ROUTES
    app.get("/", (req, res) => res.send("API working"));

    // START SERVER
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit with failure
  }
};

// START THE SERVER
startServer();
