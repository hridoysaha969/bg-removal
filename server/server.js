import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import clerkWebhooks from "./controllers/UserController.js";

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

// Wrap initialization in async function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("Connected to database");

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.get("/", (req, res) => res.send("API is working"));
    app.post("/api/user/webhooks", clerkWebhooks); // Attach the controller to the route

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
