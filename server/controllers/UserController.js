import { Webhook } from "svix";
import User from "../models/userModel.js";
// Api Controller Function to manage Clerk User with Database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix Instance With Clerk Webhook Secret
    const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await wHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers,
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await User.create(userData);
        res.json({});

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});

        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({});

        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };