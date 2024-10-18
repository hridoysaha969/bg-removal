// Api Controller Function to manage Clerk User with Database
// http://localhost:4000/api/user/webhooks

// const clerkWebhooks = async (req, res) => {};

const clerkWebhooks = async (req, res) => {
  try {
    // Add your logic here
    res.status(200).json({ message: "Webhook received and processed" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default clerkWebhooks;
