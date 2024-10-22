import "dotenv/config";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
app.post("/create-checkout-session", async (req, res) => {
  const { priceId } = req.body;

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
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/buy",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log("server running on port " + PORT));
