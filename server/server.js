import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import User from "./models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// APP CONFIGUE
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// INITIALIZE MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyParser.raw({ type: "application/json" }));

// API ROUTES
app.get("/", (req, res) => res.send("Api working"));
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.post("/create-checkout-session", async (req, res) => {
  const { priceId, creditBalance, clerkId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Use the Stripe price ID (pre-configured in Stripe dashboard)
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://bg-removal-bay.vercel.app/",
      cancel_url: "https://bg-removal-bay.vercel.app/buy",
      metadata: {
        clerkId, // Storing email in metadata
        creditBalance: creditBalance,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed: ${error.message}`);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const clerkId = session.metadata.clerkId;
    const creditBalance = session.metadata.creditBalance;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: clerkId },
        { creditBalance: creditBalance },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user credit balance:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => console.log("server running on port " + PORT));
