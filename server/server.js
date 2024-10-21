import "dotenv/config";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-09-30.acacia",
});

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
app.use("/api/image", imageRouter);
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

app.listen(PORT, () => console.log("server running on port " + PORT));
