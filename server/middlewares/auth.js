import jwt from "jsonwebtoken";

// Decode JWT token to get clerkId
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, Login again",
      });
    }

    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
