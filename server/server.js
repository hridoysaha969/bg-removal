import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

// APP CONFIGUE
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// INITIALIZE MIDDLEWARE
app.use(express.json());
app.use(cors());

// API ROUTES
app.get("/", (req, res) => res.send("Api working"));
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("server running on port " + PORT));
